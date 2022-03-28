import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveDetailsUserPageRoutingModule } from './receive-details-user-routing.module';

import { ReceiveDetailsUserPage } from './receive-details-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveDetailsUserPageRoutingModule
  ],
  declarations: [ReceiveDetailsUserPage]
})
export class ReceiveDetailsUserPageModule {}
