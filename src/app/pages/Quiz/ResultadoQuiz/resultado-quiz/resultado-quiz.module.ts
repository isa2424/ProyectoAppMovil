import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoQuizPageRoutingModule } from './resultado-quiz-routing.module';

import { ResultadoQuizPage } from './resultado-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoQuizPageRoutingModule
  ],
  declarations: [ResultadoQuizPage]
})
export class ResultadoQuizPageModule {}
