import { PaymentService } from './../../services/payment.service';
import { Utilities } from './../../utilities.js/utilities';
import { Storage } from '@ionic/storage';
import { ShopService } from './../../services/shop.service';
import { Router } from '@angular/router';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx/';

@Component({
  selector: 'app-payment-window',
  templateUrl: './payment-window.page.html',
  styleUrls: ['./payment-window.page.scss'],
})
export class PaymentWindowPage implements OnInit {
  number
  expMonth
  expYear
  cvc
  name
  mail
  phone
  validate
  rout = "payment"
  color = "black"

  ngOnInit() {
  }
  constructor(private stripe: Stripe, private http: HttpClient,
    private toastController: ToastController,
    private loadingCtrl: LoadingCtrlService,
    private router: Router,
    private shopService: ShopService,
    private storage: Storage,
    private utilities: Utilities,
    private paymentService: PaymentService,
    private alertController: AlertController) {

    this.validate = false
    /*this.number = '4242424242424242',
      this.expMonth = 12,
      this.expYear = 2020,
      this.cvc = '220'*/
  }

  payment() {
    this.loadingCtrl.present('Verificando datos...')
    if (this.validateFields()) {
      this.stripe.setPublishableKey('pk_live_C6uOpm3FE6fqqb9b8ELnSD1K00cbqvUDIC')
      let card = {
        number: this.number,
        expMonth: this.expMonth,
        expYear: this.expYear,
        cvc: this.cvc
      }
      //Validamos todos los datos
      this.stripe.validateCVC(this.cvc)
        .then(res => { this.validate = true })
        .catch(err => this.handleError('CVC no válido'))

      this.stripe.validateExpiryDate(this.expMonth, this.expYear)
        .then(res => { this.validate = true })
        .catch(err => this.handleError('Fecha de vencimiento no válida'))

      this.stripe.validateCardNumber(this.number).then(succes => this.validate = true)
        .catch(err => this.handleError('Número de tarjeta no válido'))

      this.stripe.createCardToken(card)
        .then(token => {
          if (this.validate) {
            /*this.loadingCtrl.dismiss()
            this.router.navigate(['form-shop'])
            this.presentToast('Bienvenido acá puedes regisitrar tu establecimiento')*/
            this.makePayment(token)
          }
        })
        .catch(error => this.handleError('Ha ocurrido un error'))
    } else {
      this.loadingCtrl.dismiss()
      this.presentToast('Todos los campos son requeridos')
    }
  }

  handleError(message) {
    this.loadingCtrl.dismiss()
    this.presentToast(message)
    this.validate = false
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  makePayment(token) {
    this.http.post('https://brindis.pro/api/payment', { token: token.id }).subscribe(res => {
      if (res['status'] !== 'succes') {
        this.loadingCtrl.dismiss()
        this.presentToast(res['message'])
      } else {
        this.registryPayment('subs');
        this.storage.get('mail').then(mail => {
          if (mail === undefined) {
            this.loadingCtrl.dismiss()
            this.presentToast('Por favor vuelve a iniciar sesión')
          } else {
            this.registryPayment('subs')
            this.shopService.getShopByMail(mail).subscribe(res => {
              if (res['status'] === undefined) {
                this.loadingCtrl.dismiss()
                this.router.navigate(['form-shop'])
                this.presentToast('Bienvenido acá puedes regisitrar tu establecimiento')
                this.registryPayment('subs')
                this.presentAlert()
              } else {
                this.registryPayment('subs')
                this.loadingCtrl.dismiss()
                this.utilities.setBar(res['shop'])
                this.router.navigate(['bar-window'])
                this.presentToast('Bienvenido a tu bar de nuevo')
                this.presentAlert()
              }
            })
          }
        })
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      subHeader: 'Pago exitoso',
      message: 'Tu pago ha sido exitoso, todo esta registrado bajo la pasarela de pagos Stripe para más seguridad. Recuerda que puedes recomendar ' +
        '5 eventos al mes',
      buttons: ['OK']
    });

    await alert.present();
  }

  private registryPayment(type) {
    this.utilities.setSuggested(5)
    this.paymentService.registryPayment({
      payDate: new Date(),
      userMail: this.utilities.getMail(),
      defeat: false,
      type: type
    }).subscribe(res => {
      this.presentToast(res['message']);
    });
  }

  validateFields() {
    if (this.name === undefined || this.mail === undefined || this.phone === undefined || this.number === undefined ||
      this.expMonth === undefined || this.expYear === undefined || this.cvc === undefined) {
      return false;
    } else {
      return true
    }
  }
}

