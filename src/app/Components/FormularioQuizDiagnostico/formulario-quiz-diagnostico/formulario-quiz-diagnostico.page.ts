import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreguntaQuizPrincipal } from 'src/app/models/Pregunta/pregunta-quiz';

@Component({
  selector: 'formulario-quiz-diagnostico',
  templateUrl: './formulario-quiz-diagnostico.page.html',
  styleUrls: ['./formulario-quiz-diagnostico.page.scss'],
})
export class FormularioQuizDiagnosticoPage implements OnInit {
  @Output() answer = new EventEmitter<string>();
  @Output() formGroup: FormGroup;
  @Input() Preguntas: PreguntaQuizPrincipal;//
  option = '';
  constructor() { }

  ngOnInit() {
    //Formulario 
  this.buildForm();
  
  }
 //Formulario
 ngOnChanges(changes: SimpleChanges){
  if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
    this.formGroup.patchValue({answer: ''});
   
  }
  
}

buildForm() {
  
  this.formGroup = new FormGroup({
    answer: new FormControl(['', Validators.required])
    
  });

 
}
radioChange(answer: string) {
  
  this.Preguntas.SeleccionRespuestaPrincipal = answer;
 
  this.answer.emit(answer);
  //this.displayExplanation();
}

displayExplanation(): void {
  const questionElem = document.getElementById('question');
 
  if (questionElem !== null) {
  
    questionElem.innerHTML = 'La opción ' + this.Preguntas.RespuestaCorrecta + ' es la correcta porque ' + this.Preguntas.Explicacion + '.';
  
  }
}
isCorrect(option: string): boolean {

  return this.Preguntas.SeleccionRespuestaPrincipal && option === this.Preguntas.RespuestaCorrecta;
}

// mark incorrect answer if selected
isIncorrect(option: string): boolean {
  return option !== this.Preguntas.RespuestaCorrecta && option === this.Preguntas.SeleccionRespuestaPrincipal;
}

onSubmit() {
  this.formGroup.reset({answer: null});
}

}
