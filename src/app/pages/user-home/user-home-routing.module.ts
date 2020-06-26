import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserHomePage } from './user-home.page';

const routes: Routes = [
  {
    path: 'user-home',
    component: UserHomePage,
    children: [
      {
        path: 'bars',
        loadChildren: () => import('../bars/bars.module').then(m => m.BarsPageModule)
      },
      {
        path: 'like',
        loadChildren: () => import('../like/like.module').then(m => m.LikePageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'hot',
        loadChildren: () => import('../hot/hot.module').then(m => m.HotPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'user-home/events'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserHomePageRoutingModule { }
