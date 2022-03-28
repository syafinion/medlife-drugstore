import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeupPage } from './makeup.page';

const routes: Routes = [
  {
    path: '',
    component: MakeupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeupPageRoutingModule {}
