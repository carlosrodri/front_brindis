import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopWelcomePage } from './shop-welcome.page';

const routes: Routes = [
  {
    path: '',
    component: ShopWelcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopWelcomePageRoutingModule {}
