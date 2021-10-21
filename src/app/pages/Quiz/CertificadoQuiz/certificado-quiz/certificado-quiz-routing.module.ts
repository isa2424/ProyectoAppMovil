import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificadoQuizPage } from './certificado-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: CertificadoQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificadoQuizPageRoutingModule {}
