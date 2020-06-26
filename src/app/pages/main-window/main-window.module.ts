import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainWindowPageRoutingModule } from './main-window-routing.module';

import { MainWindowPage } from './main-window.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainWindowPageRoutingModule
  ],
  declarations: [MainWindowPage]
})
export class MainWindowPageModule {}
