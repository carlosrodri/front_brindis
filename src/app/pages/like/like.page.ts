import { SitesService } from './../../services/sites.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.page.html',
  styleUrls: ['./like.page.scss'],
})
export class LikePage implements OnInit {


  bar: String
  barList: []
  shops: Shop[]


  constructor(private shopService: ShopService,
    private loadingController: LoadingController,
    private toastController: ToastController) {
    this.shopService.getShops().subscribe(res => {
      this.shops = res['shops']
    })

  }

  ngOnInit() {
  }

  barByName() {
    this.presentLoading('Cargando Bares...')
    this.shopService.getShopByName(this.bar.toUpperCase()).subscribe(res => {
      if (res['status'] === 'error') {
        this.presentToast(res['message'])
      } else {
        this.barList = res['shops']
      }
    })
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
