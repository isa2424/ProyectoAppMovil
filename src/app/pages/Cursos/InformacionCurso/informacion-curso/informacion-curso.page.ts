import { NotificacioneComponent } from './../../../../Components/Notificacione/notificacione/notificacione.component';
import { Usuario } from './../../../../models/InicioSesion/usuario';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';
import { IonSlides, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Contenido } from 'src/app/models/Contenido/contenido';
import { NotificacionesGeneralesComponent } from 'src/app/Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';

@Component({
  selector: 'app-informacion-curso',
  templateUrl: './informacion-curso.page.html',
  styleUrls: ['./informacion-curso.page.scss'],
})
export class InformacionCursoPage implements OnInit {
  ButtonText:any;
  variables:Contenido;
  data:any;
  @ViewChild('ProfileTabs') courseTabs: IonSlides;
  @ViewChild('ProfileSlides') courseSlides: IonSlides;
  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 2,
   
    centeredSlides: false,
    spaceBetween: 1
  };
  constructor(public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,private configuracion:ConfiguracionService,public navCtrl: NavController) {
      this.data=[];
      this.variables=new Contenido() ;
    }
  ionViewWillEnter() {
    this.RecuperarContenidoVideo();
    this.VerificarSiEstaRegistrado();
   
   
   
  }
  ngOnInit() {
   
  }
  VerificarSiEstaRegistrado(){
    var user1 =this.configuracion.getPersonaID();
    this.configuracion.getVerificarDatos(user1).subscribe(respuesta=>{
      if(respuesta['resultado']=='OK'){
        this.ButtonText=respuesta['mensaje'];
      }
     
      
    });
  }
  RecuperarContenidoVideo(){
    this.configuracion.getContenidoCurso(this.configuracion.id_Curso).subscribe(respuesta=>{
    
      this.data=respuesta;
    
     
      
    });
  }
  selectedTab(index:number){
    this.courseSlides.slideTo(index, 500);
}
  async onTabChanged() {
  let index = this.courseTabs.getActiveIndex();
  this.courseSlides.slideTo(await index, 500);
}
TutorialVideos(){

  if(this.ButtonText=='Iniciar Curso'){
    let IdPersona=this.configuracion.getPersonaID();
    if(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)!='2'){
      var user1 =this.configuracion.getPersonaID();
      this.variables.variable1=user1;
      
        this.variables.variable2=this.configuracion.id_Curso;
      
      this.configuracion.getIngresarPersonaCurso(this.variables).subscribe(respuesta=>{
      
        this.navCtrl.navigateRoot('/tutoriales-videos');
        
        
      });
    }else{
      this.configuracion.ActivarBoton=true;
      this.configuracion.ActivarBotonDiagnostico=false;
      this.configuracion.TextoBoton='Reiniciar Curso';
      this.configuracion.Titulo='Curso No Aprobado';
      this.configuracion.Informacion='Reprobo el examen final y su progreso se borrara .¿Desea volver intentarlo?';
      this.notifications2();
    }
   
   
    
  }
  if(this.ButtonText=='Registrarse'){
    this.notifications();
  }



  
}

async notifications() {
  const popover = await this.popoverCtrl.create({
    component: NotificacioneComponent,
    
    animated: true,
    showBackdrop: true
  });
  return await popover.present();
  }



  async notifications2() {
    const popover = await this.popoverCtrl.create({
      component: NotificacionesGeneralesComponent,
      
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
    }


}

