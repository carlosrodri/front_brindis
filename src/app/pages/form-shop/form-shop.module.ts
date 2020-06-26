import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormShopPageRoutingModule } from './form-shop-routing.module';

import { FormShopPage } from './form-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormShopPageRoutingModule,
    ModulesModule
  ],
  declarations: [FormShopPage]
})
export class FormShopPageModule {}
