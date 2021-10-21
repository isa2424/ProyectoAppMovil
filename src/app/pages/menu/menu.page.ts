import { Usuario } from './../../models/InicioSesion/usuario';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';
import { Categoria } from './../../models/Categoria/categoria';
import { ContenidoService } from './../../services/Contenido/contenido.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController, NavController, PopoverController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { PerfilPage } from '../perfil/perfil.page';
import { NotificacionesGeneralesComponent } from 'src/app/Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';
import * as moment from "moment";
import 'moment-timezone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  data:any;

  
  
 
  

  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 1.5,
   
    centeredSlides: true,
    spaceBetween: 0
  };
  constructor(public popoverCtrl: PopoverController,
    public menuCtrl: MenuController,public app:AppComponent, public navCtrl: NavController,
    public contenido: ContenidoService,private configuracion:ConfiguracionService
  ) {this.data=[];  
   
    }
    ionViewWillEnter() {
      



      this.Borrar();
      this.menuAdmin();
    this.CargarContenido();
    this.configuracion.SetActivarTab('1');
    }
  ngOnInit() {
    this.menuAdmin();
    this.CargarContenido();

  }
  Borrar(){
    this.configuracion.NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TotalPreguntas=0;
    this.configuracion.Num=0;
    this.configuracion.Quiz_NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TiempoUsado=0;
    this.configuracion.Quiz_TodasPreguntas=null;
    this.configuracion.allQuestions=null;
    

   
  }
  menuAdmin() {
    this.menuCtrl.enable(true, 'menuAdmin');
    
  }
  CargarContenido(){
    if(this.configuracion.getUserLoggedIn()!=null){
      var user1 =this.configuracion.getUserLoggedIn();
   
    this.configuracion.getRecuperarPersonaId(user1.Usuario).subscribe(resultado => {
      if(resultado!=null){
        var id =resultado.Id_Persona;
       
      this.configuracion.setPersonaID(id);
      
      }else{
        this.configuracion.setPersonaID(null);
       
      }
      
      
    });
    }
    
    this.contenido.GetRecuperarCategoria().subscribe(respuesta=>{
   
    
      this.data=respuesta;
      
     
    });
   
  }
 
 Perfil(){
  this.navCtrl.navigateRoot('/perfil');
 }
 Categorias(){
  this.navCtrl.navigateRoot('/categoria-cursos');
 }
 Cursos(CantidadCurso,Id_Categoria){
  if(CantidadCurso!=null){
   this.configuracion.setIdCategoria(Id_Categoria);
   this.navCtrl.navigateRoot('/curso-disponibles');
  }else{
   this.configuracion.Titulo='Categoria No Disponible';
   this.configuracion.Informacion='La categoria no cuenta con cursos disponible hasta nuevo aviso , saludos y hasta la proxima';
   this.notifications();
  }
 }
 async notifications() {
   const popover = await this.popoverCtrl.create({
     component: NotificacionesGeneralesComponent,
     
     animated: true,
     showBackdrop: true
   });
   return await popover.present();
   }
}
