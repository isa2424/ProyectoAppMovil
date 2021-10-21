import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioQuizDiagnosticoPage } from './formulario-quiz-diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioQuizDiagnosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioQuizDiagnosticoPageRoutingModule {}
