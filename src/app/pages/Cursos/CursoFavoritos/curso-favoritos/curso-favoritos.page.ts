import { Component, ElementRef, OnInit } from '@angular/core';
import { LoadingController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NotificacionesGeneralesComponent } from 'src/app/Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';
import { Contenido } from 'src/app/models/Contenido/contenido';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';

@Component({
  selector: 'app-curso-favoritos',
  templateUrl: './curso-favoritos.page.html',
  styleUrls: ['./curso-favoritos.page.scss'],
})
export class CursoFavoritosPage implements OnInit {
  Buscar = '' ;
 
  
  Id_Curso:number;
  Id_Persona:number;
  data:any;
  Activate:string='';
  heart: String;
  variables:Contenido;
  constructor(public popoverCtrl: PopoverController,public loadingCtrl: LoadingController,public toastCtrl: ToastController,
              public element: ElementRef,
              public navCtrl: NavController,
              private configuracion:ConfiguracionService) 
              { this.data=[] ,this.variables=new Contenido() 
              }

  ngOnInit() {
    
  
   
     
  }
 
  InformacionCurso(Disponible,id){
   
    if(Disponible=='Disponible'){
      var user1 =this.configuracion.getPersonaID();
      this.configuracion.getVerificarQuiz(user1).subscribe(respuesta=>{
        if(respuesta['resultado']=='No Existe'){
          this.configuracion.ActivarBoton=false;
          this.configuracion.ActivarBotonDiagnostico=true;
          this.configuracion.TextoBoton='Iniciar Prueba';
          this.configuracion.Titulo='Cursos no Disponibles';
        this.configuracion.Informacion='Necesita realizar una prueba de diagnostico para desbloquiar todos los cursos';
          this.notifications2();
        }else{
          this.configuracion.id_Curso=id;
    
          this.navCtrl.navigateRoot('/informacion-curso');
        }
       
        
      });


     
    }else{
      this.configuracion.ActivarBoton=false;
      this.configuracion.ActivarBotonDiagnostico=false;
      this.configuracion.TextoBoton='';
      this.configuracion.Titulo='Curso No Disponible';
    this.configuracion.Informacion='El curso estara disponible proximamente  , saludos y hasta la proxima';
    this.notifications();
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
  async notifications() {
    const popover = await this.popoverCtrl.create({
      component: NotificacionesGeneralesComponent,
      
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
    }
  
  ionViewWillEnter() {
    this.CargarCursosFavoritos();
    localStorage.setItem('Tabs', null);
    
   
  }


 
  CargarCursosFavoritos(){
    this.Id_Curso=this.configuracion.getIdCategoria();
    this.Id_Persona=this.configuracion.getPersonaID();
   
    this.variables.variable2=this.Id_Persona;
    
     
    this.configuracion.getListaCursosFavoritos(this.variables).subscribe(respuesta=>{
      this.data=respuesta;
    
      
    });
   
    
  }
  async QuitarFavoritos(Id_CursoFavorito){
    console.log(Id_CursoFavorito);
      this.configuracion.getQuitarCursoFavoritos(Id_CursoFavorito).subscribe(async respuesta=>{
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
      
      this.CargarCursosFavoritos();
      
    });
       }
      
      });
      
   
  }
 

  
}
