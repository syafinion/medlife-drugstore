import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompDetailsPageRoutingModule } from './comp-details-routing.module';

import { CompDetailsPage } from './comp-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompDetailsPageRoutingModule
  ],
  declarations: [CompDetailsPage]
})
export class CompDetailsPageModule {}
