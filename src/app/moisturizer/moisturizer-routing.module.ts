import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoisturizerPage } from './moisturizer.page';

const routes: Routes = [
  {
    path: '',
    component: MoisturizerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoisturizerPageRoutingModule {}
