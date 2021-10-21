import { NotificacionesGeneralesComponent } from './../../../../Components/NotificacionesGenerales/notificaciones-generales/notificaciones-generales.component';
import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';

@Component({
  selector: 'app-categoria-cursos',
  templateUrl: './categoria-cursos.page.html',
  styleUrls: ['./categoria-cursos.page.scss'],
})
export class CategoriaCursosPage implements OnInit {

 
  Buscar = '' ;
  
  Id_Curso:number;
  Id_Persona:number;
  data:any;
  Activate:string='';
  heart: String;
  
  constructor(public popoverCtrl: PopoverController,
              public navCtrl: NavController,
              private configuracion:ConfiguracionService) 
              { this.data=[] ;
              }

  ngOnInit() {
    
  
   
     
  }
 
  
  ionViewWillEnter() {
    this.CargarCategoriaCursos();
   
    
   
  }


 
  CargarCategoriaCursos(){
   
    
     
    this.configuracion.GetRecuperarCategoria().subscribe(respuesta=>{
      console.log(respuesta);
      this.data=respuesta;
      console.log(this.data);
      
    });
   
    
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
