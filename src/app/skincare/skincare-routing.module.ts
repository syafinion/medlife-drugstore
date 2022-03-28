import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkincarePage } from './skincare.page';

const routes: Routes = [
  {
    path: '',
    component: SkincarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkincarePageRoutingModule {}
