import { FormularioQuizDiagnosticoPageModule } from './Components/FormularioQuizDiagnostico/formulario-quiz-diagnostico/formulario-quiz-diagnostico.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [FormularioQuizDiagnosticoPageModule],
  exports: [FormularioQuizDiagnosticoPageModule]
})
export class FormularioDiagnosticoModule { }
