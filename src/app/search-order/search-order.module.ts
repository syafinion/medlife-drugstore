import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchOrderPageRoutingModule } from './search-order-routing.module';

import { SearchOrderPage } from './search-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchOrderPageRoutingModule
  ],
  declarations: [SearchOrderPage]
})
export class SearchOrderPageModule {}
