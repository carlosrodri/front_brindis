import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarsPage } from './bars.page';

const routes: Routes = [
  {
    path: '',
    component: BarsPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarsPageRoutingModule {}
