import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasQuizDiagnosticoPage } from './preguntas-quiz-diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasQuizDiagnosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasQuizDiagnosticoPageRoutingModule {}
