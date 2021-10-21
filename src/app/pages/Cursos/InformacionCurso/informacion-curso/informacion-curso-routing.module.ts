import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionCursoPage } from './informacion-curso.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionCursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionCursoPageRoutingModule {}
