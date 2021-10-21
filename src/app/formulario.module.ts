import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioQuizPageModule } from './Components/FormularioQuiz/formulario-quiz/formulario-quiz.module';



@NgModule({
  imports: [FormularioQuizPageModule],
  exports: [FormularioQuizPageModule]
})
export class FormularioModule { }
