import { ToastController, AlertController } from '@ionic/angular';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { EventService } from './../../services/event.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/utilities.js/utilities';

@Component({
  selector: 'app-cardevent-admin',
  templateUrl: './cardevent-admin.component.html',
  styleUrls: ['./cardevent-admin.component.scss'],
})
export class CardeventAdminComponent implements OnInit {
  b: boolean;
  i: boolean
  dat: string;
  @Input('date') date: string;

  sho: string;
  @Input('shop') shop: string;

  hou: string;
  @Input('hour') hour: string;

  even: string;
  @Input('event') event: string;

  id: string;
  @Input('idEvent') idEvent: string;

  curr: Event
  @Input('currentEvent') currentEvent;

  icov: string;
  @Input('cover') cover: string;

  des: string;
  @Input('description') description: string;

  constructor(private router: Router,
    private utilities: Utilities,
    private eventService: EventService,
    private loadingCtrl: LoadingCtrlService,
    private toastController: ToastController,
    private alertController: AlertController) {
    this.i = true
    this.b = true
  }


  ngOnInit() { }


  eventDetails() {
    this.router.navigate(['event-details'])
    this.utilities.setEventId(this.idEvent)
  }

  edit() {
    this.loadingCtrl.present('Espera un momento...')
    this.eventService.getEventById(this.idEvent).subscribe(res => {
      if (res['event'][0]['name'] === undefined) {
        this.loadingCtrl.dismiss()
      } else {
        this.loadingCtrl.dismiss()
        this.utilities.setEvent(res['event'][0])
        this.router.navigate(['edit-event'])
      }
    })
  }

  delete() {
    this.eventService.deleteEventById(this.idEvent).subscribe(res => {
      if (res['status'] === 'deleted') {
        this.presentToast('Evento eliminado, actualiza esta vista')
      } else {

      }
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirma la acción',
      message: '¿Estás seguro de eliminar este evento?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si',
          handler: () => {
            this.delete()
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }
}

