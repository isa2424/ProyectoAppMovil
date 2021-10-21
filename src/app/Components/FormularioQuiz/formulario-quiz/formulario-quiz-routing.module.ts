import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioQuizPage } from './formulario-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioQuizPageRoutingModule {}
