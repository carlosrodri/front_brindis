import { EndPointsService } from './services/end-points.service';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ImageService } from './services/image.service';
import { Camera } from '@ionic-native/camera/ngx';
import { UserServiceService } from './services/user-service.service';
import { EventService } from 'src/app/services/event.service';
import { ShopService } from './services/shop.service';
import { ModulesModule } from './modules/modules.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GeolocationService } from './services/geolocation.service';
import { IonicStorageModule } from '@ionic/storage'
import { Stripe } from '@ionic-native/stripe/ngx';
import { FCM } from '@ionic-native/fcm/ngx/';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ModulesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShopService,
    EventService,
    UserServiceService,
    ImageService,
    FCM,
    FileTransfer,
    GeolocationService,
    Stripe,
    Camera,
    EndPointsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
