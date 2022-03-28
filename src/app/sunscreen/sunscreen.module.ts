import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SunscreenPageRoutingModule } from './sunscreen-routing.module';

import { SunscreenPage } from './sunscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SunscreenPageRoutingModule
  ],
  declarations: [SunscreenPage]
})
export class SunscreenPageModule {}
