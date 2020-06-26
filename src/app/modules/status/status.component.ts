import { AlertController, ToastController } from '@ionic/angular';
import { ReportService } from './../../services/report.service';
import { LoadingCtrlService } from 'src/app/services/loading-ctrl.service';
import { Utilities } from './../../utilities.js/utilities';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Storage } from '@ionic/storage';
import { StatusService } from './../../services/status.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {

  usermai: string;
  @Input('usermail') usermail: string;

  commen: string;
  @Input('comment') comment: string;

  nick: string;
  @Input('nickname') nickname: string;

  @Input('token') token: string;

  tim: string;
  @Input('hour') hour: Date;

  im: string;
  @Input('img') img: string;

  @Input('statusId') statusId: string;

  @Input('statusImg') statusImg: string;

  @Input('likeList') likeList: [];

  @Input('dontLikeList') dontLikeList: [];

  date: Date
  likes
  dontLikes
  li = true
  dl = true

  constructor(private statusService: StatusService,
    private storage: Storage,
    private notificationService: NotificationsService,
    private utilities: Utilities,
    private loadingController: LoadingCtrlService,
    private reportService: ReportService,
    private alertController: AlertController,
    private toastController: ToastController) {
    this.getLikes()
    this.getDontLikes()

    setTimeout(() => {
      document.getElementById("like").id = this.statusId
      document.getElementById("dontLike").id = this.statusId + 'd'
      this.storage.get(this.statusId).then(res => {
        if (res === 'like') {
          document.getElementById(this.statusId).style.color = "#F24B4B"
        } else {
        }
      })

      this.storage.get(this.statusId + 'd').then(res => {
        if (res === 'dontLike') {
          document.getElementById(this.statusId).style.color = "#0487D9"
        } else {
        }
      })

    }, 1000)

  }

  ngOnInit() { }

  toHour() {
    this.date = new Date(this.hour)

    let time = ''
    if (this.hour === null) {
    } else {
      if (new Date().getMonth() > this.date.getMonth()) {
        time = "Ayer "
      } else {
        if (new Date().getDate() > this.date.getDate()) {
          time = 'Ayer '
        } else {
          time = "Hoy "
        }
      }
      if (this.date.getHours() > 12) {
        return time + (this.date.getHours() - 12) + ":" + this.twoCifres(this.date.getMinutes()) + " PM"
      } else {
        return time + this.date.getHours() + ':' + this.twoCifres(this.date.getMinutes()) + ' AM'
      }
    }
  }

  twoCifres(minutes) {
    if (minutes < 10) {
      return '0' + minutes
    } else {
      return minutes
    }
  }

  like() {
    if (this.li) {
      this.storage.set(this.statusId, 'like').then(res => { })
      this.li = false
      document.getElementById(this.statusId).style.color = "#F24B4B"
      this.statusService.addLike(this.statusId, 'add').subscribe(res => {
        this.sendNotification(" Le gusta tu estado")
        this.getLikes()
      })
    } else {
      this.storage.remove(this.statusId).then(res => { })
      this.li = true
      document.getElementById(this.statusId).style.color = "white"
      this.statusService.addLike(this.statusId, 'pop').subscribe(res => {
        this.getLikes()
      })
    }
  }

  sendNotification(message) {
    const notification = {
      "notification": {
        "title": "Brindis bar manager",
        "body": this.utilities.getUser().name + message
      },
      "to": this.token
    }
    this.notificationService.sendNotification(notification)
  }

  dontLike() {
    if (this.dl) {
      this.storage.set(this.statusId + 'd', 'dontLike').then(res => { })
      this.dl = false
      document.getElementById(this.statusId + 'd').style.color = "#0487D9"
      this.statusService.addDontLike(this.statusId, 'add').subscribe(res => {
        this.sendNotification(' Ha reaccionado a tu estado')
        this.getDontLikes()
      })
    } else {
      this.storage.remove(this.statusId + 'd').then(res => { })
      this.dl = true
      document.getElementById(this.statusId + 'd').style.color = "white"
      this.statusService.addDontLike(this.statusId, 'pop').subscribe(res => {
        this.getDontLikes()
      })
    }
  }

  getLikes() {
    if (this.statusImg === undefined) {
      setTimeout(() => {
        let status: BarStatus
        this.statusService.getStatusById(this.statusId).subscribe(res => {
          status = res['status']
          if (status.likeList.length > 0) {
            this.likes = status.likeList.reduce((a, b) => a + b, 0) + ' Me gusta'
          } else {
            this.likes = '0 Me gusta'
          }
        })
      }, 1000)
    } else {
      let status: BarStatus
      this.statusService.getStatusById(this.statusId).subscribe(res => {
        status = res['status']
        if (status.likeList.length > 0) {
          this.likes = status.likeList.reduce((a, b) => a + b, 0) + ' Me gusta'
        } else {
          this.likes = '0 Me gusta'
        }
      })
    }

  }

  getDontLikes() {
    if (this.statusId === undefined) {
      setTimeout(() => {
        let status: BarStatus
        this.statusService.getStatusById(this.statusId).subscribe(res => {
          status = res['status']
          if (status.dontLikeList.length > 0) {
            this.dontLikes = status.dontLikeList.reduce((a, b) => a + b, 0) + ' No me gusta'
          } else {
            this.dontLikes = '0 No me gusta'
          }
        })
      }, 1000)
    } else {
      let status: BarStatus
      this.statusService.getStatusById(this.statusId).subscribe(res => {
        status = res['status']
        if (status.dontLikeList.length > 0) {
          this.dontLikes = status.dontLikeList.reduce((a, b) => a + b, 0) + ' No me gusta'
        } else {
          this.dontLikes = '0 No me gusta'
        }
      })
    }
  }

  async report(shop) {
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
              this.doReport(data.report, shop)
            }
          }
        }
      ]
    });

    await alert.present();
  }

  doReport(report, shop: Shop) {
    this.loadingController.present('Estamos validando tu solicitud...')
    this.statusService.deleteStatus(this.statusId).subscribe(res => {
      this.loadingController.dismiss()
      this.presentToast('Refresca esta página para que desaparezca la publicación')
    })
    let newReport = {
      user: this.utilities.getUser().name,
      description: report,
      shop: this.utilities.getShopId()
    }
    this.reportService.addReport(newReport).subscribe(res => {
      this.presentToast('Hemos enviado tu reporte para verificación')
      this.sendNotification(' Ha reportado tu estado')
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
