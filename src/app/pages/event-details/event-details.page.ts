import { ReportService } from './../../services/report.service';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Storage } from '@ionic/storage';
import { AttendService } from './../../services/attend.service';
import { InterestedService } from './../../services/interested.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Utilities } from 'src/app/utilities.js/utilities';
import { EventService } from 'src/app/services/event.service';
import { Component, OnInit } from '@angular/core';
import { database } from 'firebase';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})

export class EventDetailsPage implements OnInit {
  event: Event
  rout = 'user-home'
  interest
  attend
  i = true
  a = true
  interestLis: []
  attendsList: []

  constructor(private eventservice: EventService,
    private utilities: Utilities,
    private loadingController: LoadingCtrlService,
    private interestedService: InterestedService,
    private toastController: ToastController,
    private attendService: AttendService,
    private storage: Storage,
    private alertController: AlertController,
    private reportService: ReportService) {

    this.storage.get(this.utilities.getEventId() + 'i').then(data => {
      if (data === undefined) {
      } else {
        if (data === 'attend') {
          this.a = false
          document.getElementById("assit").style.background = "#FF6308"
          document.getElementById("assit").style.color = "white"
          document.getElementById("assit").style.borderColor = "#FF6308"
        } else if (data === 'interested') {
          this.i = false
          document.getElementById('interest').style.color = "#EB5055"
        }
      }
    })

    this.storage.get(this.utilities.getEventId()).then(data => {
      if (data === undefined) {
      } else {
        if (data === 'attend') {
          this.a = false
          document.getElementById("assit").style.background = "#FF6308"
          document.getElementById("assit").style.color = "white"
          document.getElementById("assit").style.borderColor = "#FF6308"
        } else if (data === 'interested') {
          this.i = false
          document.getElementById('interest').style.color = "#EB5055"
        }
      }
    })

    this.loadingController.present('Obteniedo información del evento...')
    this.eventservice.getEventById(utilities.getEventId()).subscribe(res => {
      this.loadingController.dismiss()
      this.event = res['event'][0]
    })

    this.attendService.getAttendsByEvent(utilities.getEventId()).subscribe(res => {
      if (res['status'] === 'error') {
      } else {
        this.attendsList = res['attends']
      }
      this.attend = this.attendsList.length + ' Asistentes'
    })


    this.interestedService.getInterestedsByEvent(utilities.getEventId()).subscribe(res => {
      if (res['status'] === 'error') {
        this.interest = res['message']
      } else {
        this.interestLis = res['interested']
        this.interest = 'Interesados:       ' + this.interestLis.length
      }
    })

  }

  ngOnInit() {
  }

  toHour(date: Date) {

    let Cdate = new Date(date)

    if (Cdate.getHours() > 12) {
      return ', ' + (Cdate.getHours() - 12) + ":" + this.twoCifres(Cdate.getMinutes()) + " PM"
    } else {
      return ', ' + Cdate.getHours() + ':' + this.twoCifres(Cdate.getMinutes()) + ' AM'
    }
  }

  twoCifres(minutes) {
    if (minutes < 10) {
      return '0' + minutes
    } else {
      return minutes
    }
  }

  toDate(date) {
    if (date === null) {

    } else {
      const parts = date.split('-')
      switch (parts[1]) {
        case '01':
          return 'Ene ' + parts[2].substring(0, 2) + ''
        case '02':
          return 'Feb ' + parts[2].substring(0, 2) + ' '
        case '03':
          return 'Mar ' + parts[2].substring(0, 2) + ' '
        case '04':
          return 'Abr ' + parts[2].substring(0, 2) + ' '
        case '05':
          return 'May ' + parts[2].substring(0, 2) + ' '
        case '06':
          return 'Jun ' + parts[2].substring(0, 2) + ''
        case '07':
          return 'Jul ' + parts[2].substring(0, 2) + ' '
        case '08':
          return 'Ago ' + parts[2].substring(0, 2) + ' '
        case '09':
          return 'Sep ' + parts[2].substring(0, 2) + ' '
        case '10':
          return 'Oct ' + parts[2].substring(0, 2) + ' '
        case '11':
          return 'Nov ' + parts[2].substring(0, 2) + ' '
        case '12':
          return 'Dic ' + parts[2].substring(0, 2) + ' '
      }
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  addInterested() {
    if (this.i) {
      document.getElementById('interest').style.background = "#4A94FF"
      document.getElementById('interest').style.color = "white"
      document.getElementById("interest").style.borderColor = "#4A94FF"
      this.storage.set(this.utilities.getEventId() + 'i', 'interested')
      const interested = {
        user: this.utilities.getMail(),
        event: this.utilities.getEventId()
      }
      this.interestedService.createInterested(interested).subscribe(res => {
        this.presentToast(res['message'])
        this.i = false
      })
    } else {
      this.presentToast('Ya te interesa este evento')
    }
  }

  attendEvent() {
    if (this.a) {
      document.getElementById("assit").style.background = "#FF6308"
      document.getElementById("assit").style.color = "white"
      document.getElementById("assit").style.borderColor = "#FF6308"
      this.storage.set(this.utilities.getEventId(), 'attend')
      const attend = {
        user: this.utilities.getMail(),
        event: this.utilities.getEventId(),
        city: this.event.city
      }
      this.attendService.createAttend(attend).subscribe(res => {
        this.presentToast(res['message'])
        this.a = false
      })
    } else {
      this.presentToast('Ya asistirás a este evento')
    }
  }

  async report() {
    const alert = await this.alertController.create({
      header: 'Cuéntanos tus razones por las cuales este contenido es inapropiado',
      inputs: [
        {
          name: 'report',
          type: 'text',
          placeholder: 'Escribe algo...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: data => {
            if (data.report === undefined || data.report === "" || data.report === null) {
              this.presentToast('Debes decirnos tus razones de reporte')
            } else {
              this.doReport(data.report)
            }
          }
        }
      ]
    });

    await alert.present();
  }

  doReport(report) {
    this.loadingController.present('Estamos validando tu solicitud...')
    this.eventservice.deleteEventById(this.event._id + "").subscribe(res => {
      this.loadingController.dismiss()
      this.presentToast('Refresca esta página para que desaparezca la publicación')
    })
    let newReport = {
      user: this.utilities.getUser().name,
      description: report,
      shop: this.event.shop
    }
    this.reportService.addReport(newReport).subscribe(res=>{
      this.presentToast('Hemos enviado tu reporte para verificación')
    })
  }

}
