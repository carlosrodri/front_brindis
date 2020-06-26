import { LoadingCtrlService } from 'src/app/services/loading-ctrl.service';
import { MatchService } from './../../services/match.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bar-window',
  templateUrl: './bar-window.page.html',
  styleUrls: ['./bar-window.page.scss'],
})
export class BarWindowPage implements OnInit {
  shop: Shop
  qualification
  rout = 'user-home/user-home/perfil'
  city
  eventList: []
  matchesList: [];
  likes

  constructor(private utilities: Utilities,
    private router: Router, private eventService: EventService,
    private toastController: ToastController,
    private storage: Storage,
    private matchService: MatchService,
    private loadingCtrl: LoadingCtrlService) {

    loadingCtrl.present('Espera un momento...')
    this.storage.get('city').then((val) => {
      this.city = val
    });

    this.shop = this.utilities.getBar()
    this.like(this.shop.likeList)

    if (this.shop.qualificationList.length === 0) {
      this.qualification = 0
    } else {
      this.qualification = Math.round((this.shop.qualificationList.reduce((a, b) => a + b, 0) / this.shop.qualificationList.length) * 10) / 10
    }

    this.getEvents();
    loadingCtrl.dismiss()
    //this.getMatches()
  }

  ngOnInit() {
  }

  newEvent() {
    this.router.navigate(['event-form'])
  }

  private async getEvents() {
    this.eventService.getEventsByShop(this.shop.name).subscribe(res => {
      if (res['status'] === 'error') {
        this.presentToast(res['message']);
      }
      else {
        this.eventList = res['events']
        this.eventList.reverse()
      }
    });
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
    this.eventService.getEventsByCity(await this.storage.get(this.city)).subscribe(res => {
      this.eventList = res['events']
    })
  }

  async getMatches() {
    this.matchService.getMatchesByShop(this.shop._id).subscribe(res => {
      if (res['status'] === 'error') {
      } else {
        this.matchesList = res['matches']
      }
    })
  }

  toHour(date: Date) {

    let Cdate = new Date(date)

    if (Cdate.getHours() > 12) {
      return (Cdate.getHours() - 12) + ":" + this.twoCifres(Cdate.getMinutes()) + " PM"
    } else {
      return Cdate.getHours() + ':' + this.twoCifres(Cdate.getMinutes()) + ' AM'
    }
  }

  twoCifres(minutes) {
    if (minutes < 10) {
      return '0' + minutes
    } else {
      return minutes
    }
  }

  open(hour, closeHour, officeHours) {
    let validate = false
    if (officeHours !== null) {
      officeHours.forEach(element => {
        if (element === new Date().getDay()) {
          validate = true
        }
      });
    }

    if (validate) {
      if (new Date(closeHour).getHours() <= 23) {
        if (new Date().getHours() >= new Date(hour).getHours() && new Date().getHours()
          <= new Date(closeHour).getHours()) {
          document.getElementById("open").style.color = "green"
          return 'Abierto'
        } else {
          document.getElementById("open").style.color = "red"
          return 'Cerrado'
        }
      } else {
        if (new Date().getHours() >= new Date(hour).getHours() && new Date().getHours() <= 23 ||
          new Date().getHours() >= 0 && new Date().getHours() < new Date(closeHour).getHours()) {
          document.getElementById("open").style.color = "green"
          return 'Abierto'
        } else {
          document.getElementById("open").style.color = "red"
          return 'Cerrado'
        }
      }
    } else {
      document.getElementById("open").style.color = "red"
      return 'Cerrado'
    }
  }

  getWorkingHours(working: Array<number>) {
    if (working !== null) {
      let hours = '';
      working.forEach(element => {
        switch (element) {
          case 1:
            hours += 'Lunes'
            break;
          case 2:
            hours += ' Martes'
            break;
          case 3:
            hours += ' Miercoles'
            break;
          case 4:
            hours += ' Jueves'
            break;
          case 5:
            hours += ' Viernes'
            break;
          case 6:
            hours += ' Sábado'
            break;
          case 7:
            hours += ' Domingo'
            break;
        }
      });
      return hours;
    }
  }

  like(list: []) {
    if (list !== null) {
      this.likes = list.length + ' Me gusta'
    } else {
      this.likes = '0 Me gusta'
    }
  }


  edit() {

  }
}
