import { Variable } from './../../../../models/Variable/variable';
import { Usuario } from './../../../../models/InicioSesion/usuario';
import { Contenido } from './../../../../models/Contenido/contenido';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';
import { Component, OnInit, EventEmitter, Output, Input, ViewChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import { LoadingController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { NotificacioneComponent } from 'src/app/Components/Notificacione/notificacione/notificacione.component';
import { NotificacionesGeneralesComponent } from 'src/app/Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';

@Component({
  selector: 'app-curso-disponibles',
  templateUrl: './curso-disponibles.page.html',
  styleUrls: ['./curso-disponibles.page.scss'],
})
export class CursoDisponiblesPage implements OnInit {
  Buscar = '' ;
  active:string='';
  variables:Contenido;
  variablesId:Variable;
  Id_Curso:number;
  Id_Persona:number;
  data:any;
  Activate:string='';
  heart: String;
  @ViewChild('containerDiv') containerDiv: ElementRef;
  @ViewChildren("someVar") components;
  constructor(public popoverCtrl: PopoverController,public loadingCtrl: LoadingController,public toastCtrl: ToastController,
              public element: ElementRef,
              public navCtrl: NavController,
              private configuracion:ConfiguracionService) 
              { this.data=[],
                this.variables=new Contenido() 
                this.variablesId=new Variable()   
                
              }

  ngOnInit() {
    
  
   
     
  }
 

  
  ionViewWillEnter() {
    localStorage.setItem('Tabs', null);
    this.CargarCursos();
   
    
   
  }


  addFavoritos(data,id_Curso,Id_CursoFavorito){
    var user1 =this.configuracion.getPersonaID();
    this.configuracion.getVerificarDatos(user1).subscribe(respuesta=>{
      if(respuesta['resultados']=='Registrado'){
        this.variablesId.Id_CursoFavorito=Id_CursoFavorito;
        this.variablesId.Id_Curso=id_Curso;
        this.variablesId.Id_Persona=this.configuracion.getPersonaID();
      
      
        if(this.data[data].Favorito == 1){
         
          this.configuracion.getCursosFavorito(this.variablesId).subscribe(async respuesta=>{



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
          
          this.data[data].Favorito=0;
         
          let id= document.getElementById(id_Curso)
        
          id.innerHTML=`<ion-icon 
                        class="wishlist"  
                        name="heart" 
                        style="position: absolute;
                        left: 10px;
                        top: 10px;
                        font-size: 2rem;
                        opacity: 0.5;
                        z-index:99;
                        font-family:"Ionicons";"></ion-icon>`    
          
        });
          }

          
                
          });
          
        }else{
     
      this.configuracion.getCursosFavorito(this.variablesId).subscribe(async respuesta=>{
      

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
      
      let id= document.getElementById(id_Curso)
      this.data[data].Favorito=1;
      
      id.innerHTML=`<ion-icon 
                  class="wishlist"  
                  name="heart" 
                  style="position: absolute;
                  left: 10px;
                  top: 10px;
                  font-size: 2rem;
                  opacity:1;
                  z-index:99;
                  color:black;"></ion-icon>`    
      
    });
       }


        


      });
      
      
        }
      }else{
        this.notifications();
      }
     
      
    });
   
  }
  async notifications() {
    const popover = await this.popoverCtrl.create({
      component: NotificacioneComponent,
      
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
    }
  CargarCursos(){
    this.Id_Curso=this.configuracion.getIdCategoria();
    this.Id_Persona=this.configuracion.getPersonaID();
    this.variables.variable1=this.Id_Curso;
    this.variables.variable2=this.Id_Persona;
  
    this.configuracion.getCursosDisponibles(this.variables).subscribe(respuesta=>{
      this.data=respuesta;
     
      
    });
   
    
  }
  
  CambiarColor(){
    this.configuracion.getCursosDisponibles(this.variables).subscribe(respuesta=>{
      
    
      for(let i in respuesta){
        if(respuesta[i].Favorito==1){
          this.active = 'active';
        
          let id= document.getElementById(respuesta[i].Id_Curso)
        
          id.innerHTML=`<ion-icon 
                          class="wishlist"  
                          name="heart" 
                          style="position: absolute;
                          left: 10px;
                          top: 10px;
                          font-size: 2rem;
                          opacity:1;
                          z-index:99;
                          color:red;"></ion-icon>`
        }else{
          this.active = '';
        }
     
        
      }
      
    });
    
    
  }
  Regresar(){
  
    this.navCtrl.navigateRoot('/menu');
  }
  InformacionCurso(Disponible,id){
    if(Disponible=='Disponible'){
      var user1 =this.configuracion.getPersonaID();
      this.configuracion.getVerificarDatos(user1).subscribe(respuesta=>{
        if(respuesta['resultados']=='Registrado'){
          var user1 =this.configuracion.getPersonaID();
          this.configuracion.getVerificarQuiz(user1).subscribe(respuesta=>{
            if(respuesta['resultado']=='No Existe'){
              this.configuracion.ActivarBoton=false;
              this.configuracion.ActivarBotonDiagnostico=true;
              this.configuracion.TextoBoton='Iniciar Prueba';
              this.configuracion.Titulo='Cursos no Disponibles';
            this.configuracion.Informacion='Necesita realizar una prueba de diagnostico para desbloquear todos los cursos';
              this.notifications2();
            }else{
              this.configuracion.id_Curso=id;
        
              this.navCtrl.navigateRoot('/informacion-curso');
            }
           
            
          });
    

        }else{
          this.notifications();
        }
      });
     
    }else{
      this.configuracion.ActivarBoton=false;
      this.configuracion.ActivarBotonDiagnostico=false;
      this.configuracion.TextoBoton='';
      this.configuracion.Titulo='Curso No Disponible';
    this.configuracion.Informacion='El curso estara disponible proximamente  , saludos y hasta la proxima';
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
}
