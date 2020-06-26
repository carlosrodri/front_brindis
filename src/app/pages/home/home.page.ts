import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { SitesService } from './../../services/sites.service';
import { Storage } from '@ionic/storage';
import { UserServiceService } from './../../services/user-service.service';
import { Utilities } from './../../utilities.js/utilities';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mail
  password

  constructor(private router: Router,
    private storage: Storage) {

    this.storage.get('city').then(res => {
    })
  }
  login() {
    this.router.navigate(['login']);
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

}
