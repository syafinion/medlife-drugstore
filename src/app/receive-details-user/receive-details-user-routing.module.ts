import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveDetailsUserPage } from './receive-details-user.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveDetailsUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveDetailsUserPageRoutingModule {}
