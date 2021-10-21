import { ConfiguracionService } from './../../../../services/Configuracion/configuracion.service';
import { PreguntaQuiz, PreguntaQuizPrincipal } from './../../../../models/Pregunta/pregunta-quiz';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-preguntas-quiz',
  templateUrl: './preguntas-quiz.page.html',
  styleUrls: ['./preguntas-quiz.page.scss'],
})
export class PreguntasQuizPage implements OnInit  {
  @Input() answer: string;
  @Input() formGroup: FormGroup;
  @Output() Preguntas: PreguntaQuizPrincipal;//
  

//Tiempo
  Tiempo: number;
  TiempoPregunta = 30;
  interval: any;
  TiempoTrascurrido: number;
  
  TiempoCompleto: number;
//Preguntas

  TotalPreguntas: number;//
  
  PreguntaID = 0;
  PreguntaActual=0;
  IndexPregunta:number;
  RespuestaCorrecta: boolean;
  TieneRespuesta: boolean;
  disabled: boolean;
  PruebaTerminada: boolean;
  progressValue: number;
  NumeroPreguntasCorrectas=0;
  

  constructor(public configuracion:ConfiguracionService,private route: ActivatedRoute, public navCtrl: NavController,private router: Router) {
   
    this.route.paramMap.subscribe(params => {
      this.setPreguntaID(+params.get('questionId'));  // get the question ID and store it
      this.CargarPregunta();

      //this.Preguntas = this.GetPreguntas;
    });
  }
  ngOnInit() {
  
  }
 
  

  


  ionViewWillEnter() {
    
   
   
    
    if(this.configuracion.Quiz_TodasPreguntas==null){
      this.configuracion.Quiz_TodasPreguntas=this.configuracion.allQuestions;
    
    }
    
    
    //Preguntas
   this.NumeroPreguntasCorrectas=this.configuracion.NumeroPreguntasCorrectas;
    //this.Preguntas = this.GetPreguntas;
    this.CargarPregunta();
 
    this.TotalPreguntas = this.configuracion.allQuestions.length;
    this.Tiempo = this.TiempoPregunta;
    
    if(this.Preguntas.Id_PreguntaQuiz==1){
      this.progressValue = 100 * (this.PreguntaActual + 1) / this.TotalPreguntas;
    }else{
        this.increaseProgressValue();

    }
    
    this.IniciarTiempo();
  
   
  }
  RecuperarQuizCurso(){
    

  }
  
  private IniciarTiempo() {
   
      this.interval = setInterval(() => {
        if (this.Tiempo > 0) {
          this.Tiempo--;
         
          this.RespondioCorrectamente();

          if (/*this.NumeroPreguntasCorrectas*/ this.configuracion.NumeroPreguntasCorrectas <= this.TotalPreguntas) {
            this.CalcularTiempoTotalTrascurrido(this.configuracion.TiemposTrascurridos);
          }
         
          if (this.Tiempo === 0 && !this.EsPreguntaFinal()) {
         
            this.NavegarSiguientePregunta();
            clearInterval(this.interval);
            
          }
          if (this.Tiempo === 0 && this.EsPreguntaFinal() ) {
          
            this.NavegarCertificado();
            clearInterval(this.interval);
            
          }
          

          
          
          if (this.EsPreguntaFinal() && this.TieneRespuesta === true) {
          
            //this.NavegarCertificado();
            console.log("Entre aultima pregunta y conteste bien jajaja");
            this.PruebaTerminada = true;
            clearInterval(this.interval);
          }
          
          this.Preguntas.SeleccionRespuestaPrincipal === '';
         
        }
      }, 1000);
  }
   // comprueba si la pregunta es válida y se responde correctamente
   RespondioCorrectamente() {
  
    if (this.HayOytraPregunta() && this.EsRespuestaCorrecta()) {
    
      this.IncremetarNumeroPreguntasCorrectas();
     
      this.RespuestaCorrecta = true;
      this.TieneRespuesta = true;
      this.disabled = false;

      this.TiempoTrascurrido = Math.ceil(this.TiempoPregunta - this.Tiempo);
      if (this.getPreguntaID() < this.TotalPreguntas) {
        this.configuracion.TiemposTrascurridos = [...this.configuracion.TiemposTrascurridos, this.TiempoTrascurrido];
      } else {
        this.configuracion.TiemposTrascurridos = [...this.configuracion.TiemposTrascurridos, 0];
        this.configuracion.Quiz_TiempoUsado = this.CalcularTiempoTotalTrascurrido(this.configuracion.TiemposTrascurridos);
      }

      this.quizDelay(3000);

      if (this.getPreguntaID() < this.TotalPreguntas) {
        this.NavegarSiguientePregunta();
        clearInterval(this.interval);
      } else {
        this.NavegarCertificado();
        console.log("Entre aultima pregunta y conteste bien");
        clearInterval(this.interval);
      }
    }else{
      if(this.Preguntas.SeleccionRespuestaPrincipal!=null ){
      
        this.TieneRespuesta = true;
     

      this.TiempoTrascurrido = Math.ceil(this.TiempoPregunta - this.Tiempo);
      if (this.getPreguntaID() < this.TotalPreguntas) {
        this.configuracion.TiemposTrascurridos = [...this.configuracion.TiemposTrascurridos, this.TiempoTrascurrido];
      } else {
        this.configuracion.TiemposTrascurridos = [...this.configuracion.TiemposTrascurridos, 0];
        this.configuracion.Quiz_TiempoUsado = this.CalcularTiempoTotalTrascurrido(this.configuracion.TiemposTrascurridos);
      }

      this.quizDelay(3000);

      if (this.getPreguntaID() < this.TotalPreguntas) {
        this.NavegarSiguientePregunta();
        clearInterval(this.interval);
      } else {
        this.NavegarCertificado();
        console.log("Entre aultima pregunta y conteste mal");
        clearInterval(this.interval);
      }
      }
    }
  }

  IncremetarNumeroPreguntasCorrectas() {
          

   
    if (this.PreguntaID <= this.TotalPreguntas && this.EsRespuestaCorrecta()) {
   
      if (this.configuracion.NumeroPreguntasCorrectas === this.TotalPreguntas) {
        return this.configuracion.NumeroPreguntasCorrectas;
      } else {
        
        this.RespuestaCorrecta = true;
        this.TieneRespuesta = true;
        return this.configuracion.NumeroPreguntasCorrectas++;
       
      }
     
    } else {
   
      this.RespuestaCorrecta = false;
      this.TieneRespuesta = false;
    }
   

  }
  /****************  public API  ***************/
  getPreguntaID() {
    return this.PreguntaID;
  }

  setPreguntaID(id: number) {
    return this.PreguntaID = id;
  }

  HayOytraPregunta(): boolean {
    return this.PreguntaID <= this.configuracion.allQuestions.length;
  }

  EsPreguntaFinal(): boolean {
    this.PreguntaActual=this.PreguntaID;
    
    return this.PreguntaActual === this.TotalPreguntas;
  } 

  EsRespuestaCorrecta(): boolean {
    if(this.Preguntas.SeleccionRespuestaPrincipal!=null ){
      return this.Preguntas.SeleccionRespuestaPrincipal === this.Preguntas.RespuestaCorrecta;
    }
   
  }
  private resetTimer() {
    this.Tiempo = this.TiempoPregunta;
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }
  CargarPregunta(){
    let i=0;
   for (const data in this.configuracion.allQuestions) {
     if (this.configuracion.allQuestions[i].Id_PreguntaQuiz==this.PreguntaID) {
        this.Preguntas=this.configuracion.allQuestions[i];
       return;
     }
     i=i+1;
   }

  }
  get GetPreguntas(): PreguntaQuizPrincipal {
    return this.configuracion.allQuestions.filter(
      Preguntas => Preguntas.Id_PreguntaQuiz  === this.PreguntaID
      
    )[0];
  }
 
  displayNextQuestion() {
    
   
    
    
    this.resetTimer();
  
    this.IndexPregunta = this.PreguntaID++;

    if (typeof document.getElementById('question') !== 'undefined' && this.getPreguntaID() <= this.TotalPreguntas) {
      document.getElementById('question').innerHTML = this.configuracion.allQuestions[this.IndexPregunta]['Pregunta'];
      
    } else {
      this.NavegarCertificado();
    }
  }

  NavegarSiguientePregunta(): void {
   
    this.configuracion.Quiz_TodasPreguntas[this.configuracion.Num].SeleccionRespuestaSecundario=this.Preguntas.SeleccionRespuestaPrincipal;
    
    
    this.Preguntas.SeleccionRespuestaPrincipal = '';
    this.TieneRespuesta=false;
    this.navCtrl.navigateRoot(['/preguntas-quiz', this.getPreguntaID() + 1]).then;
    
    this.displayNextQuestion();
    console.log(this.configuracion.Num);
    this.configuracion.Num=this.configuracion.Num+1;
  }

  

  NavegarCertificado(): void {
    this.configuracion.Num=this.configuracion.Num;
    this.configuracion.Quiz_TodasPreguntas[this.configuracion.Num].SeleccionRespuestaSecundario=this.Preguntas.SeleccionRespuestaPrincipal;
    this.configuracion.Quiz_TotalPreguntas= this.TotalPreguntas
    this.configuracion.Quiz_NumeroPreguntasCorrectas=this.configuracion.NumeroPreguntasCorrectas;
    
    
    if(this.configuracion.Certificado==true){
      let IdPersona=this.configuracion.getPersonaID();
      console.log(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona));
      if(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)=="null" || localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)==null){
  
        localStorage.setItem("Curso"+this.configuracion.id_Curso+IdPersona, '1');	
        console.log(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona));
      }else{
        if(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona)=='1'){
          localStorage.setItem("Curso"+this.configuracion.id_Curso+IdPersona, '2');	
          console.log(localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona));
        }
      }
      
          
      this.navCtrl.navigateRoot('/certificado-quiz', { state:
        {
          
          
        }
      });
    }
    if(this.configuracion.Diagnostico==true){
      this.navCtrl.navigateRoot('/resultado-quiz', { state:
        {
          
          
        }
      });
    }
   

   
  }

 

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getPreguntaID() ) / this.TotalPreguntas).toFixed(1));
   
  }


  CalcularTiempoTotalTrascurrido(TiemposTrascurridos) {
    return this.configuracion.Quiz_TiempoUsado = TiemposTrascurridos.reduce((acc, cur) => acc + cur, 0);
  }















  /*
   ionViewWillEnter() {
    
   
   
    
    if(this.configuracion.Quiz_TodasPreguntas==null){
      this.configuracion.Quiz_TodasPreguntas=this.configuracion.allQuestions;
    console.log(this.configuracion.Quiz_TodasPreguntas);
    }
    
    
    //Preguntas
   this.NumeroPreguntasCorrectas=this.configuracion.NumeroPreguntasCorrectas;
    //this.Preguntas = this.GetPreguntas;
    this.CargarPregunta();
  console.log(this.Preguntas);
    this.TotalPreguntas = this.configuracion.allQuestions.length;
    this.Tiempo = this.TiempoPregunta;
    
    if(this.Preguntas.Id_PreguntaQuiz==1){
      this.progressValue = 100 * (this.PreguntaActual + 1) / this.TotalPreguntas;
    }else{
        this.increaseProgressValue();

    }
    
    this.IniciarTiempo();
  
   
  }
  RecuperarQuizCurso(){
    

  }
  
  private IniciarTiempo() {
   
      this.interval = setInterval(() => {
        if (this.Tiempo > 0) {
          this.Tiempo--;
         
          this.RespondioCorrectamente();

          if ( this.configuracion.NumeroPreguntasCorrectas <= this.TotalPreguntas) {
            this.CalcularTiempoTotalTrascurrido(this.configuracion.TiemposTrascurridos);
          }
         
          if (this.Tiempo === 0 && !this.EsPreguntaFinal()) {
            console.log("Entre en no es pregunta Final");
            this.NavegarSiguientePregunta();
            clearInterval(this.interval);
            
          }
          if (this.Tiempo === 0 && this.EsPreguntaFinal() ) {
            console.log("Entre en  es pregunta Final");
            this.NavegarCertificado();
            clearInterval(this.interval);
            
          }
          

          
          
          if (this.EsPreguntaFinal() && this.TieneRespuesta === true) {
            console.log("Entre Conteste pregunta Final");
            this.NavegarCertificado();
            this.PruebaTerminada = true;
            clearInterval(this.interval);
          }
          
          this.Preguntas.SeleccionRespuestaPrincipal === '';
         
        }
      }, 1000);
  }
   // comprueba si la pregunta es válida y se responde correctamente
   RespondioCorrectamente() {
  
    if (this.HayOytraPregunta() && this.EsRespuestaCorrecta()) {
     console.log("Entre a Respondio Corecctamente");
      this.IncremetarNumeroPreguntasCorrectas();
     
      this.RespuestaCorrecta = true;
      this.TieneRespuesta = true;
      this.disabled = false;

      this.TiempoTrascurrido = Math.ceil(this.TiempoPregunta - this.Tiempo);
      if (this.getPreguntaID() < this.TotalPreguntas) {
        this.configuracion.TiemposTrascurridos = [...this.configuracion.TiemposTrascurridos, this.TiempoTrascurrido];
      } else {
        this.configuracion.TiemposTrascurridos = [...this.configuracion.TiemposTrascurridos, 0];
        this.configuracion.Quiz_TiempoUsado = this.CalcularTiempoTotalTrascurrido(this.configuracion.TiemposTrascurridos);
      }

      this.quizDelay(3000);

      if (this.getPreguntaID() < this.TotalPreguntas) {
        this.NavegarSiguientePregunta();
        clearInterval(this.interval);
      } else {
        this.NavegarCertificado();
        clearInterval(this.interval);
      }
    }
  }

  IncremetarNumeroPreguntasCorrectas() {
          

    console.log("Antes de entrar a Incrementar "+this.TieneRespuesta);
    if (this.PreguntaID <= this.TotalPreguntas && this.EsRespuestaCorrecta()) {
      console.log("entre a  a Incrementar "+this.configuracion.NumeroPreguntasCorrectas);
      if (this.configuracion.NumeroPreguntasCorrectas === this.TotalPreguntas) {
        return this.configuracion.NumeroPreguntasCorrectas;
      } else {
        
        this.RespuestaCorrecta = true;
        this.TieneRespuesta = true;
        return this.configuracion.NumeroPreguntasCorrectas++;
       
      }
     
    } else {
      console.log("Nunca entre a  a Incrementar "+this.TieneRespuesta);
      this.RespuestaCorrecta = false;
      this.TieneRespuesta = false;
    }
   

  }

  getPreguntaID() {
    return this.PreguntaID;
  }

  setPreguntaID(id: number) {
    return this.PreguntaID = id;
  }

  HayOytraPregunta(): boolean {
    return this.PreguntaID <= this.configuracion.allQuestions.length;
  }

  EsPreguntaFinal(): boolean {
    this.PreguntaActual=this.PreguntaID;
    
    return this.PreguntaActual === this.TotalPreguntas;
  } 

  EsRespuestaCorrecta(): boolean {
    return this.Preguntas.SeleccionRespuestaPrincipal === this.Preguntas.RespuestaCorrecta;
  }
  private resetTimer() {
    this.Tiempo = this.TiempoPregunta;
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }
  CargarPregunta(){
    let i=0;
   for (const data in this.configuracion.allQuestions) {
     if (this.configuracion.allQuestions[i].Id_PreguntaQuiz==this.PreguntaID) {
        this.Preguntas=this.configuracion.allQuestions[i];
       return;
     }
     i=i+1;
   }

  }
  get GetPreguntas(): PreguntaQuizPrincipal {
    return this.configuracion.allQuestions.filter(
      Preguntas => Preguntas.Id_PreguntaQuiz  === this.PreguntaID
      
    )[0];
  }
 
  displayNextQuestion() {
    
   
    
    
    this.resetTimer();
  
    this.IndexPregunta = this.PreguntaID++;

    if (typeof document.getElementById('question') !== 'undefined' && this.getPreguntaID() <= this.TotalPreguntas) {
      document.getElementById('question').innerHTML = this.configuracion.allQuestions[this.IndexPregunta]['Pregunta'];
      
    } else {
      this.NavegarCertificado();
    }
  }

 
    
  NavegarSiguientePregunta(): void {
    console.log(this.configuracion.Num);
   console.log(this.configuracion.Quiz_TodasPreguntas);
    this.configuracion.Quiz_TodasPreguntas[this.configuracion.Num].SeleccionRespuestaSecundario=this.Preguntas.SeleccionRespuestaPrincipal;
    
    
    this.Preguntas.SeleccionRespuestaPrincipal = '';
    this.TieneRespuesta=false;
    this.navCtrl.navigateRoot(['/preguntas-quiz', this.getPreguntaID() + 1]).then;
    
    this.displayNextQuestion();
    this.configuracion.Num=this.configuracion.Num+1;
  }

 

  NavegarCertificado(): void {
    this.configuracion.Num=this.configuracion.Num;
    this.configuracion.Quiz_TodasPreguntas[this.configuracion.Num].SeleccionRespuestaSecundario=this.Preguntas.SeleccionRespuestaPrincipal;
    this.configuracion.Quiz_TotalPreguntas= this.TotalPreguntas
    this.configuracion.Quiz_NumeroPreguntasCorrectas=this.configuracion.NumeroPreguntasCorrectas;
    
    
    this.navCtrl.navigateRoot('/certificado-quiz', { state:
      {
        
        
      }
    });

   
  }

 

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getPreguntaID() ) / this.TotalPreguntas).toFixed(1));
    console.log("Loading"+this.progressValue);
  }

 

  CalcularTiempoTotalTrascurrido(TiemposTrascurridos) {
    return this.configuracion.Quiz_TiempoUsado = TiemposTrascurridos.reduce((acc, cur) => acc + cur, 0);
  }

  
  */

  
}
