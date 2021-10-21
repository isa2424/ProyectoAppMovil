import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

import { PerfilPage } from './perfil.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PerfilPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule ],
  exports: [RouterModule],
})
export class PerfilPageRoutingModule {}
