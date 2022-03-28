import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveDetailsPageRoutingModule } from './receive-details-routing.module';

import { ReceiveDetailsPage } from './receive-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveDetailsPageRoutingModule
  ],
  declarations: [ReceiveDetailsPage]
})
export class ReceiveDetailsPageModule {}
