import { Storage } from '@ionic/storage';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/utilities.js/utilities';
import { EventService } from 'src/app/services/event.service';
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { FIREBASE_CONFIG } from '..//../firebase.config';
import { storage, initializeApp } from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import firebase from 'firebase'

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {
  respData: any;
  fileUrl: any;
  captureDataUrl: string
  photo
  suggested: boolean = false;
  name: String
  description: String
  cover: Number
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
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private storage: Storage) {
    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }

    setTimeout(() => {
      if (this.utilities.getSuggestedQuatum() > 0) {
      } else {
        document.getElementById('suggested').style.display = 'none'
      }
    }, 1000)
  }

  ngOnInit() {
  }

  validateFields() {
    if (this.name === undefined || this.description === undefined || this.cover === undefined || this.hour === undefined
      || this.date === undefined) {
      return false
    } else {
      return true
    }
  }

  async newEvent() {
    if (this.validateFields() === true) {
      if (this.imageCamera === undefined) {
        this.presentToast('Selecciona una imagen para el evento')
      } else {
        this.loadingController.present('Estamos registrando tu evento')
        const pictures = storage().ref(new Date().getTime() + '')
        pictures.putString(this.imageCamera, 'data_url').then(data => {
          pictures.getDownloadURL().then((url) => {
            if (url === undefined) {
              this.loadingController.dismiss()
              this.presentToast('Ha ocurrido un error, vuelve a seleccionar una imagen')
            } else {
              this.imgUrl = url
              this.storage.set('suggested', this.suggested)
              this.event = {
                date: new Date(this.date),
                description: this.description,
                name: this.name,
                shopImg: this.utilities.getBar().imageUrl,
                shop: this.utilities.getBar().name,
                cover: this.cover,
                initHour: new Date(this.hour),
                city: this.utilities.getBar().city,
                imageUrl: url,
                suggested: this.suggested
              }
              if (this.validateFields()) {
                if (this.suggested) {
                  this.utilities.addSuggested(-1)
                } else {
                }
                this.eventService.createEvent(this.event).subscribe(res => {
                  this.loadingController.dismiss()
                  this.storage.set('suggested', true).then(res => { })
                  this.loadingController.dismiss()
                  this.presentToast(res['message'])
                  this.id = res['id']
                  this.router.navigate(['bar-window'])
                })
              } else {
              }
            }
          })
        })
      }
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

  async selectImage() {
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
  }

}
