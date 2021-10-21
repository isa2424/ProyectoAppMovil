import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasQuizPage } from './preguntas-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasQuizPageRoutingModule {}
