import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoFavoritosPage } from './curso-favoritos.page';

const routes: Routes = [
  {
    path: '',
    component: CursoFavoritosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursoFavoritosPageRoutingModule {}
