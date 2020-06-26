import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Utilities } from './../../utilities.js/utilities';
import { PaymentService } from './../../services/payment.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { CodeService } from './../../services/code.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  rout = 'perfil'
  code

  constructor(private codeService: CodeService,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingCtrlService,
    private paymentService: PaymentService,
    private utilities: Utilities,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  verifyCode() {
    this.loadingController.present('Verificando código...')
    this.codeService.verifyCode(this.code).subscribe(res => {
      if (res['status'] === 'error') {
        this.loadingController.dismiss()
        this.presentToast(res['message'])
      } else {
        this.loadingController.dismiss()
        this.presentToast(res['message'])
        this.registryPayment()
      }
    })
  }

  registryPayment() {
    this.loadingController.present('Verificando código...')
      this.utilities.setSuggested(5)
      const payment = {
        payDate: new Date(),
        userMail: this.utilities.getMail(),
        defeat: false
      }
      this.paymentService.registryPayment(payment).subscribe(res => {
        this.loadingController.dismiss()
        this.presentToast(res['message'])
      })
      this.loadingController.dismiss()
      this.router.navigate(['form-shop'])
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      subHeader: 'Pago exitoso',
      message: 'Tu pago ha sido exitoso, todo esta registrado bajo la pasarela de pagos Stripe. Recuerda que puedes erecomendar 5 ' +
      '5 eventos al mes',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  payment(){
    this.router.navigate(['payment-window'])
  }
}
