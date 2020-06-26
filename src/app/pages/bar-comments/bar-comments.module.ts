import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarCommentsPageRoutingModule } from './bar-comments-routing.module';

import { BarCommentsPage } from './bar-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulesModule,
    BarCommentsPageRoutingModule
  ],
  declarations: [BarCommentsPage]
})
export class BarCommentsPageModule {}
