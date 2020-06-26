import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation'

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  get(){
    return Geolocation.getCurrentPosition()
  }
}
