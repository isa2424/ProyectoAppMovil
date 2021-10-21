import { CargarImagenPageModule } from './Components/CargarImagen/cargar-imagen/cargar-imagen.module';
import { InstructorPageModule } from './Components/Instructor/instructor/instructor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [CargarImagenPageModule],
  exports: [CargarImagenPageModule]
})
export class InstructorModule { }
