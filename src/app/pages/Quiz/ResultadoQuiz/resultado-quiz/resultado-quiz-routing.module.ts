import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoQuizPage } from './resultado-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoQuizPageRoutingModule {}
