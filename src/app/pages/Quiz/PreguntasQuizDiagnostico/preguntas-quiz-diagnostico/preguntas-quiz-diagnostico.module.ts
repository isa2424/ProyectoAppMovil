import { FormularioQuizDiagnosticoPageModule } from './../../../../Components/FormularioQuizDiagnostico/formulario-quiz-diagnostico/formulario-quiz-diagnostico.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasQuizDiagnosticoPageRoutingModule } from './preguntas-quiz-diagnostico-routing.module';

import { PreguntasQuizDiagnosticoPage } from './preguntas-quiz-diagnostico.page';
import { FormularioDiagnosticoModule } from 'src/app/formulario-diagnostico.module';
import { ProgressBarModule } from 'angular-progress-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasQuizDiagnosticoPageRoutingModule,
    FormularioQuizDiagnosticoPageModule,
    ProgressBarModule,
    FormularioDiagnosticoModule,
    ReactiveFormsModule,
    
  ],
  declarations: [PreguntasQuizDiagnosticoPage]
})
export class PreguntasQuizDiagnosticoPageModule {}
