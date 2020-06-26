import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { LoadingCtrlService } from 'src/app/services/loading-ctrl.service';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase'
import { FIREBASE_CONFIG } from 'src/app/firebase.config';
import firebase from 'firebase'

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  respData: any;
  fileUrl: any;
  captureDataUrl: string
  photo
  suggested: boolean = false;
  name: String
  description: String
  cover: String
  date: Date
  hour: Date
  rout = 'bar-window'
  myPhoto
  imgUrl: string
  id
  color = "black"
  event
  imageCamera

  constructor(private toastController: ToastController,
    private eventService: EventService,
    private utilities: Utilities,
    private loadingController: LoadingCtrlService,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController) {
    loadingController.present('Espera un momento...')
    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }

    setTimeout(() => {
      this.setInformation(this.utilities.getEvent())
      if (this.utilities.getSuggestedQuatum() > 0) {
      } else {
        document.getElementById('suggested').style.display = 'none'
      }
    }, 1000)
  }

  ngOnInit() {
  }

  setInformation(event: Event) {
    this.name = event.name
    this.description = event.description
    this.date = event.date
    this.cover = event.cover
    this.hour = event.initHour
    this.imgUrl = event.imageUrl
    this.loadingController.dismiss()
  }

  validateFields() {
    if (this.name === undefined || this.description === undefined || this.cover === undefined || this.hour === undefined
      || this.date === undefined) {
      return false
    } else {
      return true
    }
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirma la acción',
      message: '¿Estás seguro de editar este evento?',
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
            this.editEvent()
          }
        }
      ]
    });

    await alert.present();
  }

  async editEvent() {

    if (this.validateFields() === true) {
      this.event = {
        date: this.date,
        description: this.description,
        name: this.name,
        shop: this.utilities.getBar().name,
        cover: this.cover,
        initHour: new Date(this.hour),
        city: this.utilities.getBar().city,
        imageUrl: this.imgUrl,
        suggested: this.suggested
      }
      this.eventService.updateEvent(this.utilities.getEvent()._id, this.event).subscribe(res => {
        this.storage.set('suggested', true).then(res => { })
        this.loadingController.dismiss()
        this.presentToast('Evento editado con éxito')
        this.router.navigate(['bar-window'])
      })

    } else {
      this.presentToast('Todos los campos requeridos')
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  /*async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [{
        text: 'Cámara',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          this.takePhoto()
        }
      }, {
        text: 'Galería',
        icon: 'image',
        handler: () => {
          this.selectPhotoFromGallery()
        }
      }, {
        text: 'Cancelar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async selectPhotoFromGallery() {
    try {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
      }
      const result = await this.camera.getPicture(options);
      this.imageCamera = 'data:image/jpeg;base64,' + result
      this.photo = this.imageCamera
    } catch (error) {
    }
  }

  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      }
      const result = await this.camera.getPicture(options);
      this.imageCamera = 'data:image/jpeg;base64,' + result
      this.photo = this.imageCamera
    } catch (error) {
    }
  }*/

}
