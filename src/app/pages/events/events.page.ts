import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  city
  description
  eventList: Event[] = []

  constructor(private eventService: EventService,
    private toastController: ToastController,
    private storage: Storage,
    private loadingCtrl: LoadingCtrlService) {

    this.storage.get('city').then((val) => {
      this.city = val
      if (this.city === undefined) {
        this.description = 'Eventos próximos'
      } else {
        this.description = 'Eventos en ' + this.city
      }
      this.getEvents();
    });

    //esto se cambiaaaa
    /*this.eventService.getEvents().subscribe(res => {
      res.forEach(element => {
        this.eventList.push(element)
        if (this.eventList === undefined) {
          document.getElementById('title').innerText = 'No hay eventos próximos en esta ciudad por el momento, intenta seleccionando otra ciudad en el menú de tu perfil'
        } else {
        }
      });
      this.eventList = res
    })*/
  }

  private async getEvents() {
    this.loadingCtrl.present('Buscando eventos próximos...')
    this.storage.get('city').then(res => {
      if (res === null) {
        this.loadingCtrl.dismiss()
      } else {
        this.city = res
        this.eventService.getEventsByCity(this.city).subscribe(events => {
          if (events['status'] === 'error') {
            this.loadingCtrl.dismiss()
            this.description = 'No hay eventos en esta ciudad por el momento, intenta seleccionando otra ciudad en el menú de tu perfil'
          } else {
            this.loadingCtrl.dismiss()
            this.eventList.splice(0, this.eventList.length)
            events['events'].forEach(event => {
              if (this.validateDate(event['date'])) {
                this.description = 'Eventos en ' + this.city
                this.eventList.push(event)
              } else {
              }
            })
          }
        })
        if (this.eventList.length === 0) {
          this.description = 'No hay eventos en esta ciudad por el momento, intenta seleccionando otra ciudad en el menú de tu perfil'
        } else {
          this.description = 'Eventos en ' + this.city
        }
      }
    })
  }

  ngOnInit() {
  }
  validateDate(date) {
    let option
    if (new Date(date).getFullYear() >= new Date().getFullYear()) {
      option = true
      if (new Date(date).getMonth() > new Date().getMonth()) {
        option = true
      } else {
        option = false
      }
      if (new Date(date).getMonth() === new Date().getMonth()) {
        option = true
        if (new Date(date).getDate() >= new Date().getDate()) {
          option = true
        } else {
          option = false
        }
      } else {

      }
    } else {
      option = false
    }
    return option
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async eventsByCity() {
    this.storage.get('city').then(res => {
      this.eventService.getEventsByCity(res).subscribe(events => {
        this.eventList = events['events']
      })
    })
  }

  doRefresh(event) {
    if (event === null) {
      this.getEvents()
    } else {
      this.getEvents()
      setTimeout(() => {
        event.target.complete();
      }, 2000)
    }
  }
}
