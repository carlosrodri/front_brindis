import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterestedService {

  URL_HEROKU_INTERESTED = 'https://brindis.pro/api/interesteds'
  //URi = 'http://localhost:3000/api/interesteds'

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  createInterested(interested) {
    return this.http.post(this.URL_HEROKU_INTERESTED, interested, this.utilities.getOptionsHeaders())
  }

  getInterestedsByEvent(event) {
    if (event === null) {
    } else {
      return this.http.get(this.URL_HEROKU_INTERESTED + '/event/' + event, this.utilities.getOptionsHeaders())
    }
  }

}
