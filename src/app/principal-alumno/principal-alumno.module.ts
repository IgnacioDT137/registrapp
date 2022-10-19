import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalAlumnoPageRoutingModule } from './principal-alumno-routing.module';

import { PrincipalAlumnoPage } from './principal-alumno.page';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalAlumnoPageRoutingModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [PrincipalAlumnoPage]
})
export class PrincipalAlumnoPageModule {}
