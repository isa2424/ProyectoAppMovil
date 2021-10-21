import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfiguracionService } from './services/Configuracion/configuracion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
data1:any;
data2:any;
  constructor(
  
    public navCtrl: NavController,
    private Configuracion:ConfiguracionService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.Configuracion.SetActivarTab('1');

    this.RecuperarDatos();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });   
  }
  RecuperarDatos() {
    var user1 =this.Configuracion.getUserLoggedIn();
   
     if(user1!=null){
      this.navCtrl.navigateRoot('/menu');  
    }else{
      if(localStorage.getItem('Intro')!=null){
        this.navCtrl.navigateRoot('/login')
      }else{this.navCtrl.navigateRoot('/intro')}
      
      }
    
  }



  /*Funcion para los Tabs */
  Menu(){
    this.navCtrl.navigateRoot('/menu');
  } 
  Perfil(){
    
    this.navCtrl.navigateRoot('/perfil');
 
  } 
  Salir(){
    localStorage.setItem('currentUser', null);
    localStorage.setItem('Tabs', null);
    this.navCtrl.navigateRoot('/login'); 
  } 
  Favoritos(){
    this.navCtrl.navigateRoot('/curso-favoritos');
  } 
}
