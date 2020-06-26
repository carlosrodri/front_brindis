import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarWindowPage } from './bar-window.page';

const routes: Routes = [
  {
    path: '',
    component: BarWindowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarWindowPageRoutingModule {}
