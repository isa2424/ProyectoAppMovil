import { PreguntaQuizPrincipal } from 'src/app/models/Pregunta/pregunta-quiz';
import { PreguntaQuiz } from './../../../../models/Pregunta/pregunta-quiz';
import { ConfiguracionService } from './../../../../services/Configuracion/configuracion.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Contenido } from 'src/app/models/Contenido/contenido';
import * as moment from "moment";
import 'moment-timezone';
@Component({
  selector: 'app-certificado-quiz',
  templateUrl: './certificado-quiz.page.html',
  styleUrls: ['./certificado-quiz.page.scss'],
})
export class CertificadoQuizPage implements OnInit {
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
    let IdPersona=this.configuracion.getPersonaID();
    this.Oportunidades=localStorage.getItem("Curso"+this.configuracion.id_Curso+IdPersona);
   
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
      this.variables.variable1=this.configuracion.id_Curso;
      this.variables.variable2=IdPersona;
      this.variables.variable3=this.NumeroPreguntasCorrectas;
      this.variables.variable4=this.percentage;
      this.variables.variable5=moment().format('HH:mm:ss');
      this.variables.variable6=moment().format('YYYY-MM-DD');
     
      this.configuracion.getGuardarNota(this.variables).subscribe(async respuesta =>{
       

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
      this.variables.variable1=this.configuracion.id_Curso;
      this.variables.variable2=IdPersona;
      this.variables.variable3=this.NumeroPreguntasCorrectas;
      this.variables.variable4=this.percentage;
      this.variables.variable5=moment().format('HH:mm:ss');
      this.variables.variable6=moment().format('YYYY-MM-DD');
      this.configuracion.getGuardarNota(this.variables).subscribe(async respuesta =>{
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
    }
  }

  ngOnInit() {
    
   
  }
  generarPdf(){
    let IdPersona=this.configuracion.getPersonaID();
      this.variables.variable0=IdPersona;
      this.variables.variable2=this.configuracion.id_Curso;
      this.variables.variable5=moment().format('YYYY-MM-DD');
    this.reporteService.generarPdf( this.variables).subscribe((data:any) => {
     
      if(data.estado){
        window.open(data.reporte,'_blank','Reporte Clientes');
      }
    });
  }
  toggleDetails(id){
    if( this.TodasPreguntas[id].toggle){
     
      this.TodasPreguntas[id].toggle=false;
    }else{
    
      this.TodasPreguntas[id].toggle=true;
    }
   
    
  }
  RegresarCurso(){

    this.configuracion.getPreguntaQuiz(this.configuracion.id_Curso).subscribe(respuesta=>{
			this.data=respuesta;
			
		this.configuracion.allQuestions=this.data;
		
    this.configuracion.NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TotalPreguntas=0;
    this.configuracion.Num=0;
    this.configuracion.Quiz_NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TiempoUsado=0;
    this.configuracion.Quiz_TodasPreguntas=null;
    this.navCtrl.navigateRoot('/preguntas-quiz/1');
	  
		});
   
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
  BorrarProgreso(){
     this.configuracion.NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TotalPreguntas=0;
    this.configuracion.Num=0;
    this.configuracion.Quiz_NumeroPreguntasCorrectas=0;
    this.configuracion.Quiz_TiempoUsado=0;
    this.configuracion.Quiz_TodasPreguntas=null;
    this.navCtrl.navigateRoot('/informacion-curso');
  }
}
