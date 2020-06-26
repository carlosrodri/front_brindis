import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'main-window', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  {path: 'login',loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
  {path: 'sign-up',loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)},
  {
    path: 'user-home',
    loadChildren: () => import('./pages/user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'like',
    loadChildren: () => import('./pages/like/like.module').then( m => m.LikePageModule)
  },
  {
    path: 'bars',
    loadChildren: () => import('./pages/bars/bars.module').then( m => m.BarsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'form-shop',
    loadChildren: () => import('./pages/form-shop/form-shop.module').then( m => m.FormShopPageModule)
  },
  {
    path: 'bar-window',
    loadChildren: () => import('./pages/bar-window/bar-window.module').then( m => m.BarWindowPageModule)
  },
  {
    path: 'event-form',
    loadChildren: () => import('./pages/event-form/event-form.module').then( m => m.EventFormPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('./pages/event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'bar-details',
    loadChildren: () => import('./pages/bar-details/bar-details.module').then( m => m.BarDetailsPageModule)
  },
  {
    path: 'bar-comments',
    loadChildren: () => import('./pages/bar-comments/bar-comments.module').then( m => m.BarCommentsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'hot',
    loadChildren: () => import('./pages/hot/hot.module').then( m => m.HotPageModule)
  },
  {
    path: 'main-window',
    loadChildren: () => import('./pages/main-window/main-window.module').then( m => m.MainWindowPageModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./pages/city/city.module').then( m => m.CityPageModule)
  },
  {
    path: 'payment-window',
    loadChildren: () => import('./pages/payment-window/payment-window.module').then( m => m.PaymentWindowPageModule)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./pages/edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'shop-welcome',
    loadChildren: () => import('./pages/shop-welcome/shop-welcome.module').then( m => m.ShopWelcomePageModule)
  },
  {
    path: 'user-welcome',
    loadChildren: () => import('./pages/user-welcome/user-welcome.module').then( m => m.UserWelcomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
