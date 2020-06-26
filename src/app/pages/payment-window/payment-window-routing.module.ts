import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentWindowPage } from './payment-window.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentWindowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentWindowPageRoutingModule {}
