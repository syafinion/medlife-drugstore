import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsAdminPageRoutingModule } from './item-details-admin-routing.module';

import { ItemDetailsAdminPage } from './item-details-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailsAdminPageRoutingModule
  ],
  declarations: [ItemDetailsAdminPage]
})
export class ItemDetailsAdminPageModule {}
