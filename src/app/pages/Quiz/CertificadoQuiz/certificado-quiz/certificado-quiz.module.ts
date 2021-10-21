import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificadoQuizPageRoutingModule } from './certificado-quiz-routing.module';

import { CertificadoQuizPage } from './certificado-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificadoQuizPageRoutingModule
  ],
  declarations: [CertificadoQuizPage]
})
export class CertificadoQuizPageModule {}
