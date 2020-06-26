import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  URL_HEROKU = 'https://brindis.pro/api/reports'

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  addReport(report) {
    return this.http.post(this.URL_HEROKU, report, this.utilities.getOptionsHeaders())
  }
}
