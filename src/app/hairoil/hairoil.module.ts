import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HairoilPageRoutingModule } from './hairoil-routing.module';

import { HairoilPage } from './hairoil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HairoilPageRoutingModule
  ],
  declarations: [HairoilPage]
})
export class HairoilPageModule {}
