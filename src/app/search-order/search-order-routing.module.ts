import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchOrderPage } from './search-order.page';

const routes: Routes = [
  {
    path: '',
    component: SearchOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchOrderPageRoutingModule {}
