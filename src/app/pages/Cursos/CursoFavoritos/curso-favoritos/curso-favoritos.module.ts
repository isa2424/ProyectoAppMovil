import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoFavoritosPageRoutingModule } from './curso-favoritos-routing.module';

import { CursoFavoritosPage } from './curso-favoritos.page';
import { StarModule } from 'src/app/star.module';
import { PipesModule } from 'src/app/pages/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    CursoFavoritosPageRoutingModule,StarModule
  ],
  declarations: [CursoFavoritosPage]
})
export class CursoFavoritosPageModule {}
