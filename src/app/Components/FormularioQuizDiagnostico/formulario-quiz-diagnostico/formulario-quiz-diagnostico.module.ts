import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioQuizDiagnosticoPageRoutingModule } from './formulario-quiz-diagnostico-routing.module';

import { FormularioQuizDiagnosticoPage } from './formulario-quiz-diagnostico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    FormularioQuizDiagnosticoPageRoutingModule
  ],
  declarations: [FormularioQuizDiagnosticoPage],
  exports: [
    FormularioQuizDiagnosticoPage
  ]
})
export class FormularioQuizDiagnosticoPageModule {}
