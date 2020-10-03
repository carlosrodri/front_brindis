import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  getStatusByShop(shopId) {
    return this.http.get<BarStatus>(this.endPoint.STATUS_URL + 'shop/' + shopId, this.utilities.getOptionsHeaders())
  }

  deleteStatus(statusId: string) {
    return this.http.delete(this.endPoint.STATUS_URL + statusId, this.utilities.getOptionsHeaders())
  }

  addStatus(status) {
    return this.http.post(this.endPoint.STATUS_URL, status, this.utilities.getOptionsHeaders())
  }

  addLike(stateId, option) {
    if (option === 'add') {
      return this.http.post(this.endPoint.STATUS_URL + 'like', { option: 'add', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    } else {
      return this.http.post(this.endPoint.STATUS_URL + 'like', { option: 'pop', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    }
  }

  addDontLike(stateId, option) {
    if (option === 'add') {
      return this.http.post(this.endPoint.STATUS_URL + 'dontLike', { option: 'add', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    } else {
      return this.http.post(this.endPoint.STATUS_URL + 'dontLike', { option: 'pop', number: Number(1), status: stateId }, this.utilities.getOptionsHeaders())
    }
  }

  getStatusById(statusId: string) {
    return this.http.get<BarStatus>(this.endPoint.STATUS_URL + statusId, this.utilities.getOptionsHeaders())
  }

}