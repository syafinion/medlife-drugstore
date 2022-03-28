import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailsAdminPage } from './order-details-admin.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailsAdminPageRoutingModule {}
