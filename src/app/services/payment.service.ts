import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  registryPayment(payment) {
    return this.http.post(this.endPoint.PAYMENT_URL, payment, this.utilities.getOptionsHeaders())
  }

  getPaymentByMail(mail) {
    return this.http.get(this.endPoint.PAYMENT_URL + 'mail/' + mail, this.utilities.getOptionsHeaders())
  }
}
