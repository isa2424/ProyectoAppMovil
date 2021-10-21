import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Contenido } from 'src/app/models/Contenido/contenido';
import { PreguntaQuiz, PreguntaQuizPrincipal } from 'src/app/models/Pregunta/pregunta-quiz';
import { ConfiguracionService } from 'src/app/services/Configuracion/configuracion.service';

@Component({
  selector: 'app-resultado-quiz',
  templateUrl: './resultado-quiz.page.html',
  styleUrls: ['./resultado-quiz.page.scss'],
})
export class ResultadoQuizPage implements OnInit {
  data:any;
  Oportunidades:any;
  showDetails:boolean;
  @Input() answer: string;
  @Input() question: PreguntaQuiz;
  TotalPreguntas: number;
  TodasPreguntas: PreguntaQuizPrincipal[];
  NumeroPreguntasCorrectas: number;
  percentage: number;
  TiempoUsado: number;
  elapsedMinutes: number;
  elapsedSeconds: number;
  variables:Contenido;
  constructor(public configuracion:ConfiguracionService,private reporteService:ConfiguracionService,public navCtrl: NavController,private router: Router) { this.data=[];
    this.variables=new Contenido() ;
  }
  
  ionViewWillEnter() {
   
    
   
    this.TotalPreguntas = this.configuracion.Quiz_TotalPreguntas;
    this.NumeroPreguntasCorrectas = this.configuracion.Quiz_NumeroPreguntasCorrectas;
    this.TiempoUsado = this.configuracion.Quiz_TiempoUsado;
    this.TodasPreguntas = this.configuracion.Quiz_TodasPreguntas;
    
    let i =0;
    for (const key in  this.TodasPreguntas) {
      
      if(this.TodasPreguntas[i].RespuestaCorrecta==this.TodasPreguntas[i].SeleccionRespuestaSecundario){
        this.TodasPreguntas[i].EsCorrecto=true;
      }else{
        this.TodasPreguntas[i].EsCorrecto=false;
      }
      i=i+1;
    }
    this.elapsedMinutes = Math.floor(this.TiempoUsado / 60);
    this.elapsedSeconds = this.TiempoUsado % 60;
    this.percentage = Math.round(100 * this.NumeroPreguntasCorrectas / this.TotalPreguntas);
    if(this.percentage>=75){
      let IdPersona=this.configuracion.getPersonaID();
      this.variables.variable0=this.TodasPreguntas[0].Id_TipoPregunta;
      this.variables.variable1=null;
      this.variables.variable2=IdPersona;
      this.variables.variable3=this.NumeroPreguntasCorrectas;
      this.variables.variable4=this.percentage;
      this.variables.variable5=moment().format('HH:mm:ss');
      this.variables.variable6=moment().format('YYYY-MM-DD');
     
      this.configuracion.getGuardarNotaD(this.variables).subscribe(async respuesta =>{
       
        console.log(respuesta);
         let i=0;
         for (const key in this.TodasPreguntas) {
          this.TodasPreguntas[i].Id_NotaCurso=respuesta.Id_NotaCurso;
          this.variables.variable1=this.TodasPreguntas[i].Id_NotaCurso;
          this.variables.variable2=this.TodasPreguntas[i].Id_PreguntaQuiz;
          this.variables.variable5=this.TodasPreguntas[i].SeleccionRespuestaSecundario;
         
            this.configuracion.getGuardarNotaRespuesta(this.variables).subscribe(async respuesta =>{
             
              
              })
            i=i+1;
         }
        
         
        })
      localStorage.setItem("Curso"+this.configuracion.id_Curso+IdPersona,null);

      
    }else{
      let IdPersona=this.configuracion.getPersonaID();
      this.variables.variable0=this.TodasPreguntas[0].Id_TipoPregunta;
     
      this.variables.variable2=IdPersona;
      this.variables.variable3=this.NumeroPreguntasCorrectas;
      this.variables.variable4=this.percentage;
      this.variables.variable5=moment().format('HH:mm:ss');
      this.variables.variable6=moment().format('YYYY-MM-DD');
      this.configuracion.getGuardarNotaD(this.variables).subscribe(async respuesta =>{
        let i=0;
        console.log(respuesta);
         for (const key in this.TodasPreguntas) {
            this.TodasPreguntas[i].Id_NotaCurso=respuesta.Id_NotaCurso;
            this.variables.variable1=this.TodasPreguntas[i].Id_NotaCurso;
            this.variables.variable2=this.TodasPreguntas[i].Id_PreguntaQuiz;
            this.variables.variable5=this.TodasPreguntas[i].SeleccionRespuestaSecundario;
           
            this.configuracion.getGuardarNotaRespuesta(this.variables).subscribe(async respuesta =>{
             
               
              })
            i=i+1;
         }
        })
    }
  }

  ngOnInit() {
    
   
  }
 
  toggleDetails(id){
    if( this.TodasPreguntas[id].toggle){
     
      this.TodasPreguntas[id].toggle=false;
    }else{
    
      this.TodasPreguntas[id].toggle=true;
    }
   
    
  }
 
  
  Regresar(){
  
   
    this.configuracion.NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TotalPreguntas=0;
    this.configuracion.Num=0;
    this.configuracion.Quiz_NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TiempoUsado=0;
    this.configuracion.Quiz_TodasPreguntas=null;
		this.navCtrl.navigateRoot('/menu');
	}
  

}
