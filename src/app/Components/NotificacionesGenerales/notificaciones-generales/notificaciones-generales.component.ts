import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { Contenido } from 'src/app/models/Contenido/contenido';


@Component({
  selector: 'app-notificaciones-generales',
  templateUrl: './notificaciones-generales.component.html',
  styleUrls: ['./notificaciones-generales.component.scss'],
})
export class NotificacionesGeneralesComponent implements OnInit {
  variables:Contenido;
Titulo:any;
Informacion:any;
ActivarBoton:boolean;
ActivarBotonDiagnostico:boolean;
TextoBoton:any;
data1: any;
  data2: any;
  constructor(private popoverController: PopoverController,public navCtrl: NavController,private configuracion:ConfiguracionService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) { 
    this.data1=[];
    this.data2=[];
    this.variables=new Contenido() ;
  }

  ionViewWillEnter() {
    this.TextoBoton=this.configuracion.TextoBoton;
    this.ActivarBoton=this.configuracion.ActivarBoton;
    this.ActivarBotonDiagnostico=this.configuracion.ActivarBotonDiagnostico;
    this.Titulo=this.configuracion.Titulo;
    this.Informacion=this.configuracion.Informacion;
  }
  ngOnInit() {}
  IniciarPruebaDiagnostico(){
    this.DismissClick();
    this.configuracion.getPreguntaQuizDiagnostico().subscribe(respuesta=>{
      this.data2=respuesta;
    
      this.configuracion.allQuestions=this.data2;
      this.configuracion.Diagnostico=true;
				this.configuracion.Certificado=false;
      this.navCtrl.navigateRoot('/preguntas-quiz/1');
    });
  }
  async Opciones(){
    if(this.TextoBoton=='Reiniciar Curso'){
      this.DismissClick();
      console.log("Borrare Progreso");
      let IdPersona=this.configuracion.getPersonaID();
      
      this.variables.variable1=IdPersona;
      this.variables.variable2=this.configuracion.id_Curso;
      this.configuracion.getBorrarProgresoCurso(this.variables).subscribe(respuesta=>{
        console.log("Borre el dato");
        
      });



      const loader = await this.loadingCtrl.create({
        duration: 2000
      });
      loader.present();
      loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
      
      cssClass: 'bg-profile',
      
      message: 'Curso Disponible,Puede iniciarlo',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    let IdPersona=this.configuracion.getPersonaID();
    localStorage.setItem("Curso"+this.configuracion.id_Curso+IdPersona,null);
    
    
    this.navCtrl.navigateRoot('/menu');
   
  });
  


     
    }else{
      console.log("Iniciare Quiz de diagnostico");
    }
  }
  async DismissClick() {
    await this.popoverController.dismiss();
      }
}
