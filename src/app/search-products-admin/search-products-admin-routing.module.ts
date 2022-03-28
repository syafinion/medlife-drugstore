import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProductsAdminPage } from './search-products-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SearchProductsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchProductsAdminPageRoutingModule {}
