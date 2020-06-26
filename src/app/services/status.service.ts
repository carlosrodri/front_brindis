import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient,
    private utilities: Utilities) { }
  //URL_ALL_SHOPS = 'http://localhost:3000/api/states/'

  URL_HEROKU_STATUS = 'https://brindis.pro/api/states/'
  getStatusByShop(shopId) {
    return this.http.get<BarStatus>(this.URL_HEROKU_STATUS + 'shop/' + shopId, this.utilities.getOptionsHeaders())
  }

  deleteStatus(statusId: string) {
    return this.http.delete(this.URL_HEROKU_STATUS + statusId, this.utilities.getOptionsHeaders())
  }

  addStatus(status) {
    return this.http.post(this.URL_HEROKU_STATUS, status, this.utilities.getOptionsHeaders())
  }

  addLike(stateId, option) {
    if (option === 'add') {
      return this.http.post(this.URL_HEROKU_STATUS + 'like', { option: 'add', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    } else {
      return this.http.post(this.URL_HEROKU_STATUS + 'like', { option: 'pop', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    }
  }

  addDontLike(stateId, option) {
    if (option === 'add') {
      return this.http.post(this.URL_HEROKU_STATUS + 'dontLike', { option: 'add', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    } else {
      return this.http.post(this.URL_HEROKU_STATUS + 'dontLike', { option: 'pop', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    }
  }

  getStatusById(statusId: string) {
    return this.http.get<BarStatus>(this.URL_HEROKU_STATUS + statusId, this.utilities.getOptionsHeaders())
  }

}