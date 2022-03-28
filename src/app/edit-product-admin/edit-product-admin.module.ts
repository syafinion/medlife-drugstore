import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductAdminPageRoutingModule } from './edit-product-admin-routing.module';

import { EditProductAdminPage } from './edit-product-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProductAdminPageRoutingModule
  ],
  declarations: [EditProductAdminPage]
})
export class EditProductAdminPageModule {}
