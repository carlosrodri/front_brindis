import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotPage } from './hot.page';

const routes: Routes = [
  {
    path: '',
    component: HotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotPageRoutingModule {}
