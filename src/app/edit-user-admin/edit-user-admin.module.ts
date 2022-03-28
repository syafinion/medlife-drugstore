import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserAdminPageRoutingModule } from './edit-user-admin-routing.module';

import { EditUserAdminPage } from './edit-user-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserAdminPageRoutingModule
  ],
  declarations: [EditUserAdminPage]
})
export class EditUserAdminPageModule {}
