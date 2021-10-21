import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargarImagenPageModule } from './Components/CargarImagen/cargar-imagen/cargar-imagen.module';



@NgModule({
  imports: [CargarImagenPageModule],
  exports: [CargarImagenPageModule]
})
export class ImagenModule { }
