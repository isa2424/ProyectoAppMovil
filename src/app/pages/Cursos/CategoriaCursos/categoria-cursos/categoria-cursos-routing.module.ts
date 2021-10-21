import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaCursosPage } from './categoria-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaCursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaCursosPageRoutingModule {}
