import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioQuizPageRoutingModule } from './formulario-quiz-routing.module';

import { FormularioQuizPage } from './formulario-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    FormularioQuizPageRoutingModule
  ],
  declarations: [FormularioQuizPage],
  exports: [
    FormularioQuizPage
  ]
})
export class FormularioQuizPageModule {}
