import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkincarePageRoutingModule } from './skincare-routing.module';

import { SkincarePage } from './skincare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkincarePageRoutingModule
  ],
  declarations: [SkincarePage]
})
export class SkincarePageModule {}
