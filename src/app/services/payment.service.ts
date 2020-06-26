import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  //URL_ALL_PAYMENTS = 'http://localhost:3000/api/payments/'

  URL_HEROKU_PAYMENTS = 'https://brindis.pro/api/payments/'

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  registryPayment(payment) {
    return this.http.post(this.URL_HEROKU_PAYMENTS, payment, this.utilities.getOptionsHeaders())
  }

  getPaymentByMail(mail) {
    return this.http.get(this.URL_HEROKU_PAYMENTS + 'mail/' + mail, this.utilities.getOptionsHeaders())
  }
}
