import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormShopPage } from './form-shop.page';

const routes: Routes = [
  {
    path: '',
    component: FormShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormShopPageRoutingModule {}
