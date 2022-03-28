import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsAdminPageRoutingModule } from './order-details-admin-routing.module';

import { OrderDetailsAdminPage } from './order-details-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailsAdminPageRoutingModule
  ],
  declarations: [OrderDetailsAdminPage]
})
export class OrderDetailsAdminPageModule {}
