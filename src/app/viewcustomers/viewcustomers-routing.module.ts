import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcustomersPage } from './viewcustomers.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcustomersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcustomersPageRoutingModule {}
