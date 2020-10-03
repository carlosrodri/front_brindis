import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  getShops() {
    return this.http.get<Shop[]>(this.endPoint.SHOPS_URL, this.utilities.getOptionsHeaders())
  }

  addQualification(number: number, shopId) {
    return this.http.post(this.endPoint.SHOPS_URL + '/qualification', { number: number, shop: shopId }, this.utilities.getOptionsHeaders())
  }

  quitLike(name: string, shopId: () => any) {
    return this.http.post(this.endPoint.SHOPS_URL + '/quitLike', { user: name, shop: shopId }, this.utilities.getOptionsHeaders())
  }

  addLike(name: string, shopId) {
    return this.http.post(this.endPoint.SHOPS_URL + '/like', { user: name, shop: shopId }, this.utilities.getOptionsHeaders())
  }

  registryShop(shop) {
    return this.http.post(this.endPoint.SHOPS_URL + '/', shop, this.utilities.getOptionsHeaders())
  }

  getShopByMail(mail) {
    return this.http.get<Shop>(this.endPoint.SHOPS_URL_MAIL + mail, this.utilities.getOptionsHeaders())
  }

  getShopById(id) {
    return this.http.get<Shop>(this.endPoint.SHOPS_URL + '/id/' + id, this.utilities.getOptionsHeaders())
  }

  getShopByCity(city) {
    return this.http.get<Shop[]>(this.endPoint.SHOPS_URL + '/city/' + city, this.utilities.getOptionsHeaders())
  }

  getShopByName(name: string) {
    return this.http.get(this.endPoint.SHOPS_URL + '/name/' + name, this.utilities.getOptionsHeaders())
  }

}
