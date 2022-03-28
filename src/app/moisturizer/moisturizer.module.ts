import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoisturizerPageRoutingModule } from './moisturizer-routing.module';

import { MoisturizerPage } from './moisturizer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoisturizerPageRoutingModule
  ],
  declarations: [MoisturizerPage]
})
export class MoisturizerPageModule {}
