import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HaircarePageRoutingModule } from './haircare-routing.module';

import { HaircarePage } from './haircare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HaircarePageRoutingModule
  ],
  declarations: [HaircarePage]
})
export class HaircarePageModule {}
