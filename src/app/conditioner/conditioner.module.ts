import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConditionerPageRoutingModule } from './conditioner-routing.module';

import { ConditionerPage } from './conditioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConditionerPageRoutingModule
  ],
  declarations: [ConditionerPage]
})
export class ConditionerPageModule {}
