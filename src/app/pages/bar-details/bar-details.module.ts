import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarDetailsPageRoutingModule } from './bar-details-routing.module';

import { BarDetailsPage } from './bar-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulesModule,
    ModulesModule,
    BarDetailsPageRoutingModule
  ],
  declarations: [BarDetailsPage]
})
export class BarDetailsPageModule {}
