import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  getMatchesByShop(shop) {
    return this.http.get(this.endPoint.MATCH_URL + 'shop/' + shop, this.utilities.getOptionsHeaders())
  }

  addMatch(match) {
    return this.http.post(this.endPoint.MATCH_URL, match, this.utilities.getOptionsHeaders())
  }
}
