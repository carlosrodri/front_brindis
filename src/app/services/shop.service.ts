import { Utilities } from 'src/app/utilities.js/utilities';
import { log } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient,
    private utilities: Utilities) { }
  //URL_ALL_SHOPS = 'http://localhost:3000/api/shops'
  //URL_ALL_SHOP_BY_MAIL = 'http://localhost:3000/api/shops/mail/'
  URL_HEROKU = 'https://brindis.pro/api/shops'
  URL_HEROKU_SHOP_BY_MAIL = 'https://brindis.pro/api/shops/mail/'

  getShops() {
    return this.http.get<Shop[]>(this.URL_HEROKU, this.utilities.getOptionsHeaders())
  }

  addQualification(number: number, shopId) {
    return this.http.post(this.URL_HEROKU + '/qualification', { number: number, shop: shopId }, this.utilities.getOptionsHeaders())
  }

  quitLike(name: string, shopId: () => any) {
    return this.http.post(this.URL_HEROKU + '/quitLike', { user: name, shop: shopId }, this.utilities.getOptionsHeaders())
  }

  addLike(name: string, shopId) {
    return this.http.post(this.URL_HEROKU + '/like', { user: name, shop: shopId }, this.utilities.getOptionsHeaders())
  }

  registryShop(shop) {
    return this.http.post(this.URL_HEROKU + '/', shop, this.utilities.getOptionsHeaders())
  }

  getShopByMail(mail) {
    return this.http.get<Shop>(this.URL_HEROKU_SHOP_BY_MAIL + mail, this.utilities.getOptionsHeaders())
  }

  getShopById(id) {
    return this.http.get<Shop>(this.URL_HEROKU + '/id/' + id, this.utilities.getOptionsHeaders())
  }

  getShopByCity(city) {
    return this.http.get<Shop[]>(this.URL_HEROKU + '/city/' + city, this.utilities.getOptionsHeaders())
  }

  getShopByName(name: string) {
    return this.http.get(this.URL_HEROKU + '/name/' + name, this.utilities.getOptionsHeaders())
  }

}
