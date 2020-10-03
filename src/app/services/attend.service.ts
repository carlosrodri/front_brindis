import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendService {
  
  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }
  
  createAttend(attend) {
    return this.http.post(this.endPoint.ATTEND_URL, attend, this.utilities.getOptionsHeaders())
  }
  
  getAttends() {
    return this.http.get(this.endPoint.ATTEND_URL)
  }
  getAttendsByEvent(event) {
    return this.http.get(this.endPoint.ATTEND_URL + '/event/' + event, this.utilities.getOptionsHeaders())
  }
}
