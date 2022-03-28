import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveDetailsPage } from './receive-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveDetailsPageRoutingModule {}
