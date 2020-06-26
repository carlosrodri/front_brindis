import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendService {
  
  constructor(private http: HttpClient,
    private utilities: Utilities) { }
  
  //URi = 'http://localhost:3000/api/attends'
  URI_HEROKU_URI = 'https://brindis.pro/api/attends/'
  
  createAttend(attend) {
    return this.http.post(this.URI_HEROKU_URI, attend, this.utilities.getOptionsHeaders())
  }
  
  getAttends() {
    return this.http.get(this.URI_HEROKU_URI)
  }
  getAttendsByEvent(event) {
    return this.http.get(this.URI_HEROKU_URI + '/event/' + event, this.utilities.getOptionsHeaders())
  }
}
