import { StatusService } from './../../services/status.service';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { storage, initializeApp } from 'firebase'
import firebase from 'firebase'
import { FIREBASE_CONFIG } from './../../firebase.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail: String
  password: String
  statusList: [BarStatus]

  constructor(private userService: UserServiceService,
    private toastController: ToastController,
    private router: Router, private utilities: Utilities,
    private loadingController: LoadingCtrlService,
    private storage: Storage,
    private shopService: ShopService,
    private statusService: StatusService) {

    this.storage.get('city').then(res => {
    })

    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }
  }

  ngOnInit() {
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  login() {
    this.loadingController.present('Validando tu información...')
    if (this.password === undefined || this.mail === undefined) {
      this.presentToast('Todos los campos son obligatorios')
    } else {
      this.userService.login(this.mail, this.password).subscribe(data => {
        this.loadingController.dismiss()
        if (data['status'] == 'error') {
          this.presentToast(data['message'])
        } else {
          this.setDatas(data);
        }
      })
    }
  }

  private setDatas(data: Object) {
    this.shopService.getShopByMail(data['user']['mail']).subscribe(res => {
      if (res['status'] === 'error') {
      } else {
        this.utilities.setBar(res['shop'])
      }
    })
    this.utilities.setToken(data['token']);
    this.utilities.setMail(data['user']['mail']);
    this.utilities.setUser(data['user'])
    this.storage.set('password', this.password).then(res=>{});
    this.storage.set('mail', data['user']['mail']).then(res=>{})
    this.storage.set('perfil', data['user']['imageUrl']).then(res => { })
    this.router.navigate(['city']);
    this.presentToast('Bienvenido ' + data['message']);
  }

}
