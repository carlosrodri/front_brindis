import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  getEvents() {
    return this.http.get<Event[]>(this.endPoint.EVENT_URL, this.utilities.getOptionsHeaders())
  }

  createEvent(event) {
    return this.http.post(this.endPoint.EVENT_URL, event, this.utilities.getOptionsHeaders())
  }

  getEventById(idEvent: string) {
    return this.http.get<Event>(this.endPoint.EVENT_URL + '/id/' + idEvent, this.utilities.getOptionsHeaders())
  }

  getEventsByCity(city: String) {
    return this.http.get(this.endPoint.EVENT_URL + '/city/' + city, this.utilities.getOptionsHeaders())
  }

  getEventsByShop(bar: String) {
    return this.http.get(this.endPoint.EVENT_URL + '/shop/' + bar, this.utilities.getOptionsHeaders())
  }

  updateEvent(id: any, event) {
    return this.http.put(this.endPoint.EVENT_URL + '/' + id, event, this.utilities.getOptionsHeaders())
  }

  deleteEventById(idEvent: string) {
    return this.http.delete(this.endPoint.EVENT_URL+'/'+ idEvent, this.utilities.getOptionsHeaders())
  }

  getSuggestions(city) {
    return this.http.get(this.endPoint.EVENT_URL + '/suggestions/' + city, this.utilities.getOptionsHeaders())
  }
}