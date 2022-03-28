import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompDetailsPage } from './comp-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompDetailsPageRoutingModule {}
