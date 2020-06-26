import { Utilities } from 'src/app/utilities.js/utilities';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,
    private utilities: Utilities) { }
  //URL_EVENTS = 'http://localhost:3000/api/events'
  URL_HEROKU = 'https://brindis.pro/api/events'

  getEvents() {
    return this.http.get<Event[]>(this.URL_HEROKU, this.utilities.getOptionsHeaders())
  }

  createEvent(event) {
    return this.http.post(this.URL_HEROKU, event, this.utilities.getOptionsHeaders())
  }

  getEventById(idEvent: string) {
    return this.http.get<Event>(this.URL_HEROKU + '/id/' + idEvent, this.utilities.getOptionsHeaders())
  }

  getEventsByCity(city: String) {
    return this.http.get(this.URL_HEROKU + '/city/' + city, this.utilities.getOptionsHeaders())
  }

  getEventsByShop(bar: String) {
    return this.http.get(this.URL_HEROKU + '/shop/' + bar, this.utilities.getOptionsHeaders())
  }

  updateEvent(id: any, event) {
    return this.http.put(this.URL_HEROKU + '/' + id, event, this.utilities.getOptionsHeaders())
  }

  deleteEventById(idEvent: string) {
    return this.http.delete(this.URL_HEROKU+'/'+ idEvent, this.utilities.getOptionsHeaders())
  }

  getSuggestions(city) {
    return this.http.get(this.URL_HEROKU + '/suggestions/' + city, this.utilities.getOptionsHeaders())
  }
}