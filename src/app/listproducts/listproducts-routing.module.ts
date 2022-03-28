import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListproductsPage } from './listproducts.page';

const routes: Routes = [
  {
    path: '',
    component: ListproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListproductsPageRoutingModule {}
