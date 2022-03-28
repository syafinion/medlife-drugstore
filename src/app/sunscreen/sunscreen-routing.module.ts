import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SunscreenPage } from './sunscreen.page';

const routes: Routes = [
  {
    path: '',
    component: SunscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SunscreenPageRoutingModule {}
