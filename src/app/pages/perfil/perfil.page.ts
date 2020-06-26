import { ShopService } from './../../services/shop.service';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { SitesService } from './../../services/sites.service';
import { Storage } from '@ionic/storage';
import { PaymentService } from './../../services/payment.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  name
  nickname
  rout = 'user-home'
  bars
  perfil
  sitesList = new Array()
  city
  myCity
  color = 'black'
  filterList: string[]

  constructor(private utilities: Utilities,
    private router: Router,
    private toastController: ToastController,
    private paymentService: PaymentService,
    private storgae: Storage,
    private alertController: AlertController,
    private sitesService: SitesService,
    private loadingCtrl: LoadingCtrlService,
    private shopService: ShopService) {

    this.shopService.getShopByMail(this.utilities.getUser().mail).subscribe(rest => {
      console.log(rest['status'] + '  bar por mail');
      console.log(this.utilities.getUser().mail + ' usuarioooo mamil');

    })


    loadingCtrl.present('Estamos obteniendo la lista de ciudades...')
    this.sitesService.getSites().subscribe(res => {
      res.forEach(element => {
        this.sitesList.push(element['municipio'])
      });
      this.sitesList.sort()
      this.loadingCtrl.dismiss()
    })

    this.storgae.get('city').then(res => {
      if (res !== null) {
        this.myCity = res
      }
    })

    this.name = this.utilities.getUser().name
    this.nickname = this.utilities.getUser().nickname
    this.storgae.get('mail').then(res => {
      if (res === null) {

      } else {
        this.shopService.getShopByMail(res).subscribe(rest => {
          this.loadingCtrl.dismiss()
          this.bars = rest['shop'].name
          if (this.bars === undefined) {
            document.getElementById("myBar").style.display = "none"
          }
          this.utilities.setBar(rest['shop'])
        })
        this.storgae.get('perfil').then(res => {
          if (res === null) {
            this.perfil = '/assets/userBig.png'
          } else {
            this.perfil = res
          }
        })
      }
    })

    setTimeout(() => {
      document.querySelector("ion-searchbar").addEventListener('ionInput', this.handleInput)
    }, 1000)
  }

  handleInput(event) {
    const items = Array.from(document.querySelector('ion-list').children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        (item as HTMLElement).style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  ngOnInit() {
  }

  myPhoto() {

  }

  select(site) {
    this.presentToast('Has seleccionado ' + site)
    this.utilities.setCity(site)
    this.storgae.remove('city').then(res => {
      this.storgae.set('city', site).then(res => {
        this.myCity = site
        this.router.navigate(['user-home/user-home/events'])
      })
    })
  }
  async logOut() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión!',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si',
          handler: () => {
            this.storgae.remove('mail').then(res => { })
            this.storgae.remove('password').then(res => { })
            this.storgae.remove('perfil').then(res => { })
            this.storgae.remove('city').then(res => { })
            this.router.navigate(['home'])
          }
        }
      ]
    });

    await alert.present();
  }

  myBar() {
    this.loadingCtrl.present('Espera un momento...')
    this.shopService.getShopByMail(this.utilities.getUser().mail).subscribe(res=>{
      if (res['status'] === 'error') {
        this.loadingCtrl.dismiss()
        this.presentToast('No tienes un bar adscrito')
      } else {
        this.validatePayment()
      }
    })
  }

  bar() {
    this.loadingCtrl.present('Verificando información...')
    this.shopService.getShopByMail(this.utilities.getUser().mail).subscribe(rest => {
      if (rest['status'] === 'error') {
        this.loadingCtrl.dismiss()
        this.router.navigate(['payment'])
      } else {
        this.loadingCtrl.dismiss()
        this.presentToast('Ya tienes un bar')
      }
    })
  }

  validatePayment() {
    this.paymentService.getPaymentByMail(this.utilities.getUser().mail).subscribe(res => {
      if (res['error'] === undefined) {
        this.validatePayDate(res)
      } else {
        this.loadingCtrl.dismiss()
        this.presentToast('No se ha registrado algún pago')
      }
    })
  }

  validatePayDate(res) {
    if (res['payment'] === undefined) {
      //TO-DO cambiar esto, eliminarlo del todo
      this.loadingCtrl.dismiss()
      this.router.navigate(['bar-window'])
    } else {
      let payDate = new Date().getTime() - new Date(res['payment']['payDate']).getTime()
      if (Math.round(payDate / (1000 * 60 * 60 * 24)) > 20) {
        this.loadingCtrl.dismiss()
        this.router.navigate(['payment-window'])
        this.presentToast('No hemos registrado tu pago este mes')
      } else {
        this.loadingCtrl.dismiss()
        this.router.navigate(['bar-window'])
      }
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
