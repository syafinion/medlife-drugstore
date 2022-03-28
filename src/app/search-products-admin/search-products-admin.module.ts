import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchProductsAdminPageRoutingModule } from './search-products-admin-routing.module';

import { SearchProductsAdminPage } from './search-products-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchProductsAdminPageRoutingModule
  ],
  declarations: [SearchProductsAdminPage]
})
export class SearchProductsAdminPageModule {}
