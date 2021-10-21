import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialesVideosPage } from './tutoriales-videos.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialesVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialesVideosPageRoutingModule {}
