import { StarModule } from './../../../star.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorialesVideosPageRoutingModule } from './tutoriales-videos-routing.module';

import { TutorialesVideosPage } from './tutoriales-videos.page';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { ImagenModule } from 'src/app/imagen.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialesVideosPageRoutingModule,VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,ImagenModule
  ],
  declarations: [TutorialesVideosPage]
})
export class TutorialesVideosPageModule {}
