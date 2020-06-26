import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarWindowPageRoutingModule } from './bar-window-routing.module';

import { BarWindowPage } from './bar-window.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarWindowPageRoutingModule,
    ModulesModule
  ],
  declarations: [BarWindowPage]
})
export class BarWindowPageModule {}
