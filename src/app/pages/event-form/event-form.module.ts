import { Camera } from '@ionic-native/camera/ngx';
import { ModulesModule } from './../../modules/modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFormPageRoutingModule } from './event-form-routing.module';

import { EventFormPage } from './event-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventFormPageRoutingModule,
    ModulesModule
  ],
  declarations: [EventFormPage]
})
export class EventFormPageModule {}
