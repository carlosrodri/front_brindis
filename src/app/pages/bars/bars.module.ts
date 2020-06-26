import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarsPageRoutingModule } from './bars-routing.module';

import { BarsPage } from './bars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulesModule,
    BarsPageRoutingModule
  ],
  declarations: [BarsPage]
})
export class BarsPageModule {}
