

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController, NavController } from '@ionic/angular';

import { NgZone } from '@angular/core';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';
import { Usuario } from 'src/app/models/InicioSesion/usuario';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  @ViewChild('IntroTabs') introTabs: IonSlides;
  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private Configuracion:ConfiguracionService,
    private zone: NgZone) {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit(): void {
    /*let u: Usuario = {Usuario:0};  
           
          //Aqui se manda a guardar en el localstore 
          this.Configuracion.setUserLoggedIn(u);
    this.Configuracion.SetFinalizoIntro('0');*/
    
  }
  MenuPrincipal(){
  	this.Configuracion.SetFinalizoIntro('1');
    this.navCtrl.navigateRoot('/login');
  }
  Siguiente(){
    this.introTabs.slideNext();
  }

}
