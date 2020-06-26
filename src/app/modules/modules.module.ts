import { CardeventAdminComponent } from './cardevent-admin/cardevent-admin.component';
import { StatusComponent } from './status/status.component';
import { CommentComponent } from './comment/comment.component';
import { CardBarComponent } from './card-bar/card-bar.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { CardComponetComponent } from './card-componet/card-componet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CardComponetComponent,
    EventCardComponent,
    NavBarComponent,
    BackButtonComponent,
    CommentComponent,
    StatusComponent,
    CardeventAdminComponent,
    CardBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CardComponetComponent,
    EventCardComponent,
    NavBarComponent,
    BackButtonComponent,
    CommentComponent,
    StatusComponent,
    CardeventAdminComponent,
    CardBarComponent
  ]
})
export class ModulesModule { }
