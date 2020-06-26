import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  URL_HEROKU_MATCH = 'https://brindis.pro/api/matches/'

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  getMatchesByShop(shop) {
    return this.http.get(this.URL_HEROKU_MATCH + 'shop/' + shop, this.utilities.getOptionsHeaders())
  }

  addMatch(match) {
    return this.http.post(this.URL_HEROKU_MATCH, match, this.utilities.getOptionsHeaders())
  }
}
