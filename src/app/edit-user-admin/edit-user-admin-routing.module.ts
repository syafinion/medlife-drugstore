import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserAdminPage } from './edit-user-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserAdminPageRoutingModule {}
