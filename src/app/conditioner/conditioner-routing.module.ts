import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConditionerPage } from './conditioner.page';

const routes: Routes = [
  {
    path: '',
    component: ConditionerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConditionerPageRoutingModule {}
