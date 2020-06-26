import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopWelcomePageRoutingModule } from './shop-welcome-routing.module';

import { ShopWelcomePage } from './shop-welcome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopWelcomePageRoutingModule
  ],
  declarations: [ShopWelcomePage]
})
export class ShopWelcomePageModule {}
