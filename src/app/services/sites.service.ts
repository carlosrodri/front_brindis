import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  //URL_ALL_SHOPS = 'http://localhost:3000/api/sites'

  URL_HEROKU_SITES = 'https://brindis.pro/api/sites/'

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  getSites() {
    return this.http.get<[]>(this.URL_HEROKU_SITES, this.utilities.getOptionsHeaders())
  }
}
