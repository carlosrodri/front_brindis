import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Storage } from '@ionic/storage';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.page.html',
  styleUrls: ['./hot.page.scss'],
})
export class HotPage implements OnInit {

  eventList: Event[] = []
  city
  description = 'Eventos recomendados'

  constructor(private eventService: EventService,
    private storage: Storage,
    private laodingCtrl: LoadingCtrlService) {

    this.storage.get('city').then(res => {
      this.city = res
      if (res === null) {
      } else {
        this.getSuggested(res);
      }
    })
  }

  validateDate(date) {
    let option
    if (new Date(date).getFullYear() >= new Date().getFullYear()) {
      option = true
      if (new Date(date).getMonth() >= new Date().getMonth()) {
        option = true
        if (new Date(date).getDate() >= new Date().getDate()) {
          option = true
        } else {
          option = false
        }
      } else {
        option = false
      }
    } else {
      option = false
    }
    return option
  }

  private getSuggested(city: any) {
    this.laodingCtrl.present('Estamos obteniendo los eventos recomendados...')
    this.eventService.getSuggestions(city).subscribe(res => {
      this.laodingCtrl.dismiss();
      if (this.eventList !== undefined) {
        this.eventList.splice(0, this.eventList.length)
        res['events'].forEach(element => {
          if (this.validateDate(element['date'])) {
            this.eventList.push(element)
          } else {
          }
        });
      } else {
        res['events'].forEach(element => {
          if (this.validateDate(element['date'])) {
            this.eventList.push(element)
          } else {
            
          }
        });
      }
      if (this.eventList.length === 0) {
        setTimeout(()=>{
        this.description = 'No hay eventos recomendados en ' + this.city + '  por el momento';
        },1000)
      }
      else {
        this.description = 'Eventos recomendados para ti en ' + this.city;
      }
    })
  }

  doRefresh(event) {
    this.getSuggested(this.city)
    setTimeout(() => {
      event.target.complete();
    }, 2000)
  }

  ngOnInit() {
  }

  toDate(date) {
    const parts = date.split('-')
    switch (parts[1]) {
      case '01':
        return 'Ene ' + parts[2].substring(0, 2)
      case '02':
        return 'Feb ' + parts[2].substring(0, 2)
      case '03':
        return 'Mar ' + parts[2].substring(0, 2)
      case '04':
        return 'Abr ' + parts[2].substring(0, 2)
      case '05':
        return 'May ' + parts[2].substring(0, 2)
      case '06':
        return 'Jun ' + parts[2].substring(0, 2)
      case '07':
        return 'Jul ' + parts[2].substring(0, 2)
      case '08':
        return 'Ago ' + parts[2].substring(0, 2)
      case '09':
        return 'Sep ' + parts[2].substring(0, 2)
      case '10':
        return 'Oct ' + parts[2].substring(0, 2)
      case '11':
        return 'Nov ' + parts[2].substring(0, 2)
      case '12':
        return 'Dic ' + parts[2].substring(0, 2)
    }
  }

}
