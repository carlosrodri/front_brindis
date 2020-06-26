import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarDetailsPage } from './bar-details.page';

const routes: Routes = [
  {
    path: '',
    component: BarDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarDetailsPageRoutingModule {}
