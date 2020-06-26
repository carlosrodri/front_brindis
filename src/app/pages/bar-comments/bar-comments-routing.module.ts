import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarCommentsPage } from './bar-comments.page';

const routes: Routes = [
  {
    path: '',
    component: BarCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarCommentsPageRoutingModule {}
