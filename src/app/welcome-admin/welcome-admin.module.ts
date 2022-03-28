import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeAdminPageRoutingModule } from './welcome-admin-routing.module';

import { WelcomeAdminPage } from './welcome-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeAdminPageRoutingModule
  ],
  declarations: [WelcomeAdminPage]
})
export class WelcomeAdminPageModule {}
