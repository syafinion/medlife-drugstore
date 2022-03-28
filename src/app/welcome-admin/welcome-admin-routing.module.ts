import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeAdminPage } from './welcome-admin.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeAdminPageRoutingModule {}
