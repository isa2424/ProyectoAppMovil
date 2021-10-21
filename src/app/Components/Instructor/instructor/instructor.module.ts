import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorPageRoutingModule } from './instructor-routing.module';

import { InstructorPage } from './instructor.page';
import { StarModule } from 'src/app/star.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorPageRoutingModule,StarModule
  ],
  declarations: [InstructorPage]
})
export class InstructorPageModule {}
