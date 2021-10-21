import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasQuizPageRoutingModule } from './preguntas-quiz-routing.module';

import { PreguntasQuizPage } from './preguntas-quiz.page';
import { ProgressBarModule } from 'angular-progress-bar';
import { FormularioQuizPageModule } from 'src/app/Components/FormularioQuiz/formulario-quiz/formulario-quiz.module';
import { FormularioModule } from 'src/app/formulario.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasQuizPageRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,
    FormularioModule
  ],
  declarations: [PreguntasQuizPage]
})
export class PreguntasQuizPageModule {}
