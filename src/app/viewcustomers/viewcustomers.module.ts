import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewcustomersPageRoutingModule } from './viewcustomers-routing.module';

import { ViewcustomersPage } from './viewcustomers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewcustomersPageRoutingModule
  ],
  declarations: [ViewcustomersPage]
})
export class ViewcustomersPageModule {}
