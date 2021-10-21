
import { ConfiguracionService } from './../../../services/Configuracion/configuracion.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InicioSesion } from 'src/app/models/InicioSesion/inicio-sesion';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/InicioSesion/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data:InicioSesion;
  datas:Usuario;
  passwordTypeInput = 'password';
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  
  constructor(
    public alertCtrl: ToastController,
    private iniciosesionService:ConfiguracionService,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController) { this.data=new InicioSesion();}

    patt = "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.pattern(this.patt)
      ])],
      'password': [null, Validators.compose([
        Validators.required, Validators.minLength(8)
      ])]
    });

    get email() { return this.onLoginForm.get('email'); }
    get password() { return this.onLoginForm.get('password'); }
    public errorMessages = {
      email: [
        { type: 'required', message: 'Por favor digite el correo' },
        { type: 'pattern', message: 'Por favor digite un correo válido' },
      ],
      password: [
        { type: 'required', message: 'Por favor digite la clave' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
      ]
    };
    ionViewWillEnter() {
      this.menuCtrl.enable(false);
    }
  ngOnInit() {
   
    
  }
  goToHome() {
    console.log(this.data);    
    this.iniciosesionService.Ingresar(this.data).subscribe(async respuesta =>{
      console.log(respuesta);
      if(respuesta['resultado']=='OK'){  
         //lo q esta aqui solo esrecuperar el ID tu lo tienes diferente 
         this.iniciosesionService.RecuperarId(this.data).subscribe(respuesta =>{
          this.data=respuesta;
          console.log("Prueba");
          console.log(this.data); 
          let u: Usuario = {Usuario:this.data.id};  
          console.log(u);    
          //Aqui se manda a guardar en el localstore 
          this.iniciosesionService.setUserLoggedIn(u);
          })     
        localStorage.setItem('Tabs', '1');
        this.navCtrl.navigateRoot('/menu');
       }
       if(respuesta['resultado']=='No Coincide'){
        let alert = this.alertCtrl.create({
            
          message: respuesta['mensaje'],
          buttons: [
            {
              text: 'Confirmar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        (await alert).present();
       }
       if(respuesta['resultado']=='No Encontrado'){
        let alert = this.alertCtrl.create({
            
          message: respuesta['mensaje'],
          buttons: [
            {
              text: 'Confirmar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        (await alert).present();
       }
      }) 
  }
  goToRegister() {
    this.navCtrl.navigateRoot('/creacioncuenta');
  }
}
