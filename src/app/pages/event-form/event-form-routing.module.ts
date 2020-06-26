import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventFormPage } from './event-form.page';

const routes: Routes = [
  {
    path: '',
    component: EventFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventFormPageRoutingModule {}
