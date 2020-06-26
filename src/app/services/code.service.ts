import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  URL_HEROKU_CODE = 'https://brindis.pro/api/codes/'
  //URI_CODE = 'http://localhost:3000/api/codes/'


  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  verifyCode(code) {
    return this.http.get(this.URL_HEROKU_CODE + code, this.utilities.getOptionsHeaders())
  }

  deleteCode(id) {
    return this.http.delete(this.URL_HEROKU_CODE + id, this.utilities.getOptionsHeaders())
  }
}
