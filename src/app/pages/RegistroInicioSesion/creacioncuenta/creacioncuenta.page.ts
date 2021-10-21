import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InicioSesion } from 'src/app/models/InicioSesion/inicio-sesion';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacioncuenta',
  templateUrl: './creacioncuenta.page.html',
  styleUrls: ['./creacioncuenta.page.scss'],
})
export class CreacioncuentaPage implements OnInit {

  data:InicioSesion;
  passwordTypeInput = 'password';
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  constructor(
    public toastCtrl: ToastController,
    private iniciosesionService:ConfiguracionService,
    public navCtrl: NavController,
    private router:Router,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {this.data=new InicioSesion(); }
  patt = "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
  onRegisterForm = this.formBuilder.group({
    fullName: ['', Validators.compose([
      Validators.required
    ])],
    email: ['', Validators.compose([Validators.required, Validators.pattern(this.patt)
    ])],
    password: ['', Validators.compose([
      Validators.required, Validators.minLength(8)
    ])]
  });

  get fullName() { return this.onRegisterForm.get('fullName'); }
  get email() { return this.onRegisterForm.get('email'); }
  get password() { return this.onRegisterForm.get('password'); }


  public errorMessages = {
    
    fullName: [
      { type: 'required', message: 'Por favor digite nombre' },
    ],

    email: [
      { type: 'required', message: 'Por favor digite correo' },
      { type: 'pattern', message: 'Por favor digite un correo válido' },
    ],
    password: [
      { type: 'required', message: 'Por favor digite clave' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
    ]
  };
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  soloLetras(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return false;
    }
  }
  togglePasswordMode() {
    //cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    //obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    //obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
    //ejecuto el focus al input
    nativeEl.focus();
    //espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }
  ngOnInit() {
   
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
  async signUp() {
    console.log(this.data);
    
      this.iniciosesionService.crearCuenta(this.data).subscribe(async respuesta =>{
        console.log(respuesta);
        if(respuesta['resultado']=='OK'){
          const loader = await this.loadingCtrl.create({
            duration: 2000
          });
          loader.present();
          loader.onWillDismiss().then(async l => {
          const toast = await this.toastCtrl.create({
          
          cssClass: 'bg-profile',
          
          message: respuesta['mensaje'],
          duration: 4000,
          position: 'bottom'
        });
  
        toast.present();
        
        this.navCtrl.navigateRoot('/login');
        
      });
        
        }
        

         if(respuesta['resultado']=='Existente'){
          let alert = this.alertCtrl.create({
            
            message: 'El correo ya existe',
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

}

