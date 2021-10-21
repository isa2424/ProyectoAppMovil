import { InstructorPageModule } from './../../Instructor/instructor/instructor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarImagenPageRoutingModule } from './cargar-imagen-routing.module';

import { CargarImagenPage } from './cargar-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarImagenPageRoutingModule
  ],
  declarations: [CargarImagenPage],
  exports: [
    CargarImagenPage
  ]
})
export class CargarImagenPageModule {}
