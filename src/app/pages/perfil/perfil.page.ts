import { ConfiguracionService } from './../../services/Configuracion/configuracion.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides, IonContent, IonHeader, LoadingController, ToastController, NavController, PopoverController } from '@ionic/angular';
import { Directive, ElementRef, Renderer2, RendererType2 } from '@angular/core';
import { Chart } from 'chart.js';
import { HidenavStretchheaderComponent } from 'src/app/Components/hidenav/hidenav-stretchheader.component';
import { Persona } from 'src/app/models/Persona/persona';
import { NotificacionesGeneralesComponent } from 'src/app/Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';
import { Contenido } from 'src/app/models/Contenido/contenido';
import * as moment from "moment";
import 'moment-timezone';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
 
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonContent, {read: ElementRef}) contentElem: ElementRef;
  @ViewChild(IonHeader, {read: ElementRef}) header: ElementRef;
  Todos:boolean;
  Finalizados:boolean;
  GraficasDisponibles:boolean;
  CursosDisponibles:boolean;
  Diploma:boolean;
  mensajeCurso:any;
  mensajeDiploma:any;
  mensaje:any;
  var_x:any;
  var_y:any;
  scrollTop = 0;
  lastscroll = 0;
  direction = '';
  navheight = 0;
  tapping = false;
  scrolling = false;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  lineChart: any;
  barChart: any;

  Genero : any;
  Provincia : any;
  data:Persona;
  dataProgreso:any;
  dataProgresoCursos:any;
  dataPreguntas:any;
  dataCursosFinalizados:any;
  variables:Contenido;
  @ViewChild('ProfileTabs') profileTabs: IonSlides;
  @ViewChild('ProfileSlides') profileSlides: IonSlides;
  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 4,
   
    centeredSlides: false,
    spaceBetween: 0
  };
  constructor( public popoverCtrl: PopoverController,public navCtrl: NavController,public loadingCtrl: LoadingController,
              public menuCtrl: MenuController,
              public element: ElementRef, 
              public renderer: Renderer2,
              private configuracion:ConfiguracionService,public toastCtrl: ToastController) 
  { this.Genero=[],
    this.Provincia=[],
    this.data=new Persona(); 
    this.dataProgreso=[];
    this.dataProgresoCursos=[];
    this.dataPreguntas=[];
    this.dataCursosFinalizados=[];
    this.variables=new Contenido();
   
    this.Graficas();
  }

  ngOnInit() {
   
  }
  ionViewWillEnter() {
   
    this.Todos=true;
    this.Finalizados=false;
   
    
    this.menuCtrl.enable(false);
    this.CargarCursosFinalizados();
    this.recuperar();
    this.RecuperarCursos();
    var user1 =this.configuracion.getUserLoggedIn();
    this.data.Id_Inicio_Sesion=user1.Usuario;
    this.configuracion.RecuperarDatosPersona(this.data).subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta['resultado']=='Registrado'){
        this.data=respuesta;
      }else{
        this.data=respuesta;
        this.data.Nombres=""
        this.data.Apellidos="";
        
      }
   
      //this.Foto=this.data.Foto;
      //this.fotografia= this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ this.Foto)
    
      })
      

    
  }
  CargarCursosFinalizados(){
    var user1 =this.configuracion.getPersonaID();
    this.configuracion.getRecuperarCursosFinalizados(user1).subscribe(respuesta =>{
      console.log(respuesta);
      if(respuesta['resultado']=="No Existe"){
        this.mensajeDiploma=respuesta['mensaje'];
        this.Diploma=false;
      }else{
        this.Diploma=true;
        this.dataCursosFinalizados=respuesta;

      }
        
     
    
      })
  }
  
  soloNumeros(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  soloLetras(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return false;
    }
  }
 
  TodosCursos(){
    this.Todos=true;
    this.Finalizados=false;
  }
  CursosFinalizados(){
    this.Todos=false;
    this.Finalizados=true;
  }
  RecuperarCursos(){
    var user1 =this.configuracion.getPersonaID();
  
  this.configuracion.getRecuperarCursosInscritos(user1).subscribe(async respuesta =>{
    console.log(respuesta);
    if(respuesta['resultado']=='No Registrado'){
      this.mensajeCurso=respuesta['mensaje'];
      this.CursosDisponibles=false;
    }else{
      this.CursosDisponibles=true;
      this.dataProgresoCursos=respuesta;
      let i=0;
      for (const data in this.dataProgresoCursos ) {
        if(this.dataProgresoCursos[i].TotalProgreso!=null){
          console.log(this.dataProgresoCursos[i].Aprobado);
          if(this.dataProgresoCursos[i].Aprobado==0){
            let porcentaje=80 * (this.dataProgresoCursos[i].TotalProgreso) / this.dataProgresoCursos[i].TotalPreguntas;
            
            this.dataProgresoCursos[i].Porcentaje= porcentaje.toFixed(2);
          }else{
            console.log("entre");
            let porcentaje=80 * (this.dataProgresoCursos[i].TotalProgreso) / this.dataProgresoCursos[i].TotalPreguntas;
            console.log(porcentaje);
            let PorcentajeFinal=porcentaje+20;
            console.log(PorcentajeFinal);
            this.dataProgresoCursos[i].Porcentaje= PorcentajeFinal.toFixed(2);
          }
         
        }else{
          this.dataProgresoCursos[i].Porcentaje='0';
        }
      
        i=i+1;
      }
     
    }
   




  })  
  }
 Graficas(){
  var user1 =this.configuracion.getPersonaID();
  
  this.configuracion.getProgresoCursoGraficas(user1).subscribe(async respuesta =>{
   console.log(respuesta);
    if(respuesta['resultado']=="No Registrado"){
      this.mensaje=respuesta['mensaje'];
      this.GraficasDisponibles=false;
    }else{
      this.GraficasDisponibles=true;
      this.dataProgreso=respuesta;

      this.configuracion.getPreguntasCursoGraficas().subscribe(async respuesta =>{
        this.dataPreguntas=respuesta;
        let i=0;
        let j=0;
        
        for (const data in this.dataProgreso ) {
          for (const key in this.dataPreguntas) {
            
            
            if(this.dataProgreso[i].Id_Curso==this.dataPreguntas[j].Id_Curso){


              if(this.dataProgreso[i].Aprobado==0){
                this.dataProgreso[i].PreguntasTotal=this.dataPreguntas[j].Total;
                let porcentaje=80 * (this.dataProgreso[i].PogresoVideos) / this.dataProgreso[i].PreguntasTotal;
                this.dataProgreso[i].Porcentaje= porcentaje.toFixed(2);
              }else{
                console.log("entre");
                this.dataProgreso[i].PreguntasTotal=this.dataPreguntas[j].Total;
                let porcentaje=80 * (this.dataProgreso[i].PogresoVideos) / this.dataProgreso[i].PreguntasTotal;
               
                let PorcentajeFinal=porcentaje+20;
               
                this.dataProgreso[i].Porcentaje= PorcentajeFinal.toFixed(2);
              }
             

            }
            j=j+1;	
          }
          j=0;
          i=i+1;
        }
       
       
        this.var_x = this.dataProgreso.map(item => item.Identificador);
        this.var_y= this.dataProgreso.map(item => item.Porcentaje);

        console.log(this.var_x);
        console.log(this.var_y);
            if(this.barCanvas){
           
              this.barChart = new Chart(this.barCanvas.nativeElement, {
                type: "bar",
                data: {
                  
                  labels:this.var_x,
                  datasets: [
                    {
                      label: 'Porcentaje',
                      data: this.var_y,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(21, 120, 16, 0.2)",
                        "rgba(16, 120, 104, 0.2)",
                        "rgba(114, 10, 156, 0.2)",
                        "rgba(240, 34, 34, 0.2)"
                      ],
                      borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(21, 120, 16, 0.2)",
                        "rgba(16, 120, 104, 0.2)",
                        "rgba(114, 10, 156, 0.2)",
                        "rgba(240, 34, 34, 0.2)"
                      ],
                      borderWidth: 1
                    }
                  ]
                },
                options: {
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true
                        }
                      }
                    ]
                  }
                }
              });
            }
             if( this.lineCanvas){
                 this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                     type: 'line',
                     data: {
                         labels: this.var_x,
                         datasets: [
                             {
                                 label:"Porcentaje",
                                 fill: false,
                                 lineTension: 0.1,
                                 backgroundColor: "rgba(75,192,192,0.4)",
                                 borderColor: "rgba(75,192,192,1)",
                                 borderCapStyle: 'butt',
                                 borderDash: [],
                                 borderDashOffset: 0.0,
                                 borderJoinStyle: 'miter',
                                 pointBorderColor: "rgba(75,192,192,1)",
                                 pointBackgroundColor: "#fff",
                                 pointBorderWidth: 1,
                                 pointHoverRadius: 5,
                                 pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                 pointHoverBorderColor: "rgba(220,220,220,1)",
                                 pointHoverBorderWidth: 2,
                                 pointRadius: 1,
                                 pointHitRadius: 10,
                                 data: this.var_y,
                                 spanGaps: false,
                             }
                         ]
                     }
          
                 });
             }
      })  
 

    }
   
    console.log( this.GraficasDisponibles);



  })      
  
  

}
 
  recuperar(){
    this.configuracion.RecuperarGenero().subscribe(resultado => {
     
      this.Genero = resultado;
    });
    this.configuracion.RecuperarProvincia().subscribe(resultado => {
     
      this.Provincia= resultado;
    });
    
  }

   async onTabChanged(){
        let index = this.profileTabs.getActiveIndex();
        this.profileSlides.slideTo(await index, 500);
    }
    selectedTab(index:number){
      this.profileSlides.slideTo(index, 500);
  }

  async sendData() {
    this.data.FechaRegistro= moment().format('YYYY-MM-DD');
    this.configuracion.ActualizarPersona(this.data).subscribe(async respuesta =>{
      
    
      if(respuesta['resultado']=='OK'){
          const loader = await this.loadingCtrl.create({
          duration: 2000
        });
        loader.present();
        loader.onWillDismiss().then(async l => {
        const toast = await this.toastCtrl.create({
        
        cssClass: 'bg-profile',
        
        message: respuesta['mensaje'],
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      var user1 =this.configuracion.getUserLoggedIn().Usuario;
      this.configuracion.getRecuperarPersonaId(user1).subscribe(resultado => {
        var id =resultado.Id_Persona;
        this.configuracion.setPersonaID(id);
        this.navCtrl.navigateRoot('/perfil');
      });
      
      
    });
       }
      })
  }

  InformacionCurso(id){
    let IdPersona=this.configuracion.getPersonaID();
    this.configuracion.id_Curso=id;
    if(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)!='2'){
     
      this.navCtrl.navigateRoot('/tutoriales-videos');
     
    }else{
      this.configuracion.ActivarBoton=true;
      this.configuracion.ActivarBotonDiagnostico=false;
      this.configuracion.TextoBoton='Reiniciar Curso';
      this.configuracion.Titulo='Curso No Aprobado';
      this.configuracion.Informacion='Reprobo el examen final y su progreso se borrara .¿Desea volver intentarlo?';
      this.notifications2();
    
    }
    
  }
  async notifications2() {
    const popover = await this.popoverCtrl.create({
      component: NotificacionesGeneralesComponent,
      
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
    }

    generarPdf(Id,fecha){
      let IdPersona=this.configuracion.getPersonaID();
      this.variables.variable0=IdPersona;
      this.variables.variable2=Id;
      this.variables.variable5=fecha;
      console.log(this.variables);
      this.configuracion.generarPdf( this.variables).subscribe((data:any) => {
        console.log(data);
        if(data.estado){
          window.open(data.reporte,'_blank','Reporte Clientes');
        }
      });
    }
}
