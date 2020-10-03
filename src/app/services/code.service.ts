import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  verifyCode(code) {
    return this.http.get(this.endPoint.CODE_URL + code, this.utilities.getOptionsHeaders())
  }

  deleteCode(id) {
    return this.http.delete(this.endPoint.CODE_URL + id, this.utilities.getOptionsHeaders())
  }
}
