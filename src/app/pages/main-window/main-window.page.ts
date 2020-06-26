import { StatusService } from './../../services/status.service';
import { ShopService } from './../../services/shop.service';
import { PaymentService } from './../../services/payment.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilities } from './../../utilities.js/utilities';
import { UserServiceService } from './../../services/user-service.service';
import { Storage } from '@ionic/storage';
import { SitesService } from './../../services/sites.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { storage, initializeApp } from 'firebase'
import firebase from 'firebase'
import { FIREBASE_CONFIG } from './../../firebase.config';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.page.html',
  styleUrls: ['./main-window.page.scss'],
})
export class MainWindowPage implements OnInit {

  mail
  password
  statusList: [BarStatus]
  URL_HEROKU_MESSAGE = 'https://brindis.pro/api/message/'

  constructor(private toastControlller: ToastController,
    private storage: Storage,
    private siteService: SitesService,
    private userService: UserServiceService,
    private router: Router,
    private utilities: Utilities,
    private http: HttpClient,
    private shopService: ShopService,
    private statusService: StatusService,
    private alertController: AlertController) {

    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }

    this.delete()

    if (this.storage.get('sites') === undefined) {
      this.siteService.getSites().subscribe(res => {
        this.storage.set('sites', res)
      })
    } else {
    }

    this.storage.get('mail').then(res => {
      if (res === null) {

      } else {
        this.mail = res
      }
    })

    this.storage.get('password').then(res => {
      if (res === null) {
        setTimeout(() => {
          this.router.navigate(['home'])
        }, 5000)
      } else {
        this.password = res
        if (this.mail === undefined && this.password === undefined) {
          setTimeout(() => {
            this.router.navigate(['home'])
          }, 5000)
        } else {
          this.userService.login(this.mail, this.password).subscribe(data => {
            if (data['status'] == 'error') {
              setTimeout(() => {
                this.router.navigate(['home'])
              }, 5000)
            } else {
              this.setDatas(data);
            }
          })
        }
      }
    })
  }

  deleteImageStatus(shopId) {
    if (new Date().getHours() >= 8 && new Date().getHours() <= 18) {
      this.statusService.getStatusByShop(shopId).subscribe(res => {
        if (res['message'] === undefined) {
          this.statusList = res['status'];
          this.statusList.forEach(status => {
            if (status.statusImg !== null) {
              storage().refFromURL(status.statusImg).delete().then(res=>{})
            } else {
              console.log('this status doesn´t have image');
            }
          })
        }
      })
    }
  }

  async presentToast(message) {
    const toast = await this.toastControlller.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  delete() {
    console.log('entry to delete');
    storage().refFromURL('https://firebasestorage.googleapis.com/v0/b/brindis-io.appspot.com/o/1585970980603?alt=media&token=8e689c35-0bb4-42b5-ad75-55a6ccc10000').
      delete().then(res=>{})
  }

  private setDatas(data: Object) {
    this.utilities.setToken(data['token']);
    this.utilities.setMail(data['user']['mail']);
    this.utilities.setUser(data['user'])
    this.router.navigate(['user-home']);
    this.shopService.getShopByMail(data['user']['mail']).subscribe(res => {
      if (res['message'] === undefined) {
        this.utilities.setBar(res['shop'])
        this.deleteImageStatus(this.utilities.getBar()._id)
      } else {
      }
    })
    this.presentToast('Bienvenido ' + data['message']);
    this.http.get(this.URL_HEROKU_MESSAGE, this.utilities.getOptionsHeaders()).subscribe(res=>{
      if (res['status'] === 'ok') {
        this.presentAlert(res['message'])
      } else {
      }
    })
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'IMPORTANTE',
      subHeader: 'Aviso',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
