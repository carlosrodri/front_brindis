import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainWindowPage } from './main-window.page';

const routes: Routes = [
  {
    path: '',
    component: MainWindowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainWindowPageRoutingModule {}
