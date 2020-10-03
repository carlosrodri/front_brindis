import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterestedService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  createInterested(interested) {
    return this.http.post(this.endPoint.INTERESTED_URL, interested, this.utilities.getOptionsHeaders())
  }

  getInterestedsByEvent(event) {
    if (event === null) {
    } else {
      return this.http.get(this.endPoint.INTERESTED_URL + '/event/' + event, this.utilities.getOptionsHeaders())
    }
  }

}
