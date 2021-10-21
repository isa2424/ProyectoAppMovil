import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoDisponiblesPage } from './curso-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: CursoDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoDisponiblesPageRoutingModule {}
