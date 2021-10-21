import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacioncuentaPageRoutingModule } from './creacioncuenta-routing.module';

import { CreacioncuentaPage } from './creacioncuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreacioncuentaPageRoutingModule
  ],
  declarations: [CreacioncuentaPage]
})
export class CreacioncuentaPageModule {}
