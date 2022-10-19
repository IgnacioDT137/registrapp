import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificativoPageRoutingModule } from './justificativo-routing.module';

import { JustificativoPage } from './justificativo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustificativoPageRoutingModule
  ],
  declarations: [JustificativoPage]
})
export class JustificativoPageModule {}
