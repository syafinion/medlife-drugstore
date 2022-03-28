import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchProductAdminPageRoutingModule } from './search-product-admin-routing.module';

import { SearchProductAdminPage } from './search-product-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchProductAdminPageRoutingModule
  ],
  declarations: [SearchProductAdminPage]
})
export class SearchProductAdminPageModule {}
