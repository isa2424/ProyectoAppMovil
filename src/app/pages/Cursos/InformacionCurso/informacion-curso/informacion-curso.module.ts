import { InstructorPageModule } from './../../../../Components/Instructor/instructor/instructor.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionCursoPageRoutingModule } from './informacion-curso-routing.module';

import { InformacionCursoPage } from './informacion-curso.page';
import { StarModule } from 'src/app/star.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionCursoPageRoutingModule,StarModule,InstructorPageModule
  ],
  declarations: [InformacionCursoPage]
})
export class InformacionCursoPageModule {}
