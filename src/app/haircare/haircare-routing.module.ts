import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HaircarePage } from './haircare.page';

const routes: Routes = [
  {
    path: '',
    component: HaircarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HaircarePageRoutingModule {}
