import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoDisponiblesPageRoutingModule } from './curso-disponibles-routing.module';

import { CursoDisponiblesPage } from './curso-disponibles.page';
import { StarRatingPage } from 'src/app/Components/star-rating/star-rating/star-rating.page';
import { SharedModule } from 'src/app/shared.module';
import { StarModule } from 'src/app/star.module';
import { PipesModule } from 'src/app/pages/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    IonicModule,
    CursoDisponiblesPageRoutingModule,StarModule
  ],
  declarations: [CursoDisponiblesPage]
})
export class CursoDisponiblesPageModule {}
