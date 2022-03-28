import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProductAdminPage } from './search-product-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SearchProductAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchProductAdminPageRoutingModule {}
