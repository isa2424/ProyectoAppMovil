import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaCursosPageRoutingModule } from './categoria-cursos-routing.module';

import { CategoriaCursosPage } from './categoria-cursos.page';
import { PipesModule } from 'src/app/pages/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    CategoriaCursosPageRoutingModule
  ],
  declarations: [CategoriaCursosPage]
})
export class CategoriaCursosPageModule {}
