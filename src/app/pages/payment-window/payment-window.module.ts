import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentWindowPageRoutingModule } from './payment-window-routing.module';

import { PaymentWindowPage } from './payment-window.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulesModule,
    PaymentWindowPageRoutingModule
  ],
  declarations: [PaymentWindowPage]
})
export class PaymentWindowPageModule {}
