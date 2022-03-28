import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetailsAdminPage } from './item-details-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ItemDetailsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetailsAdminPageRoutingModule {}
