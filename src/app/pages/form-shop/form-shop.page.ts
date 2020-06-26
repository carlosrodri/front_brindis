import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { FIREBASE_CONFIG } from './../../firebase.config';
import { SitesService } from './../../services/sites.service';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ShopService } from './../../services/shop.service';
import { GeolocationService } from './../../services/geolocation.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Component, OnInit } from '@angular/core';
import { storage, initializeApp } from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import firebase from 'firebase'

@Component({
  selector: 'app-form-shop',
  templateUrl: './form-shop.page.html',
  styleUrls: ['./form-shop.page.scss'],
})
export class FormShopPage implements OnInit {

  names: String
  nickName: String
  kind: String
  description: String
  hour: String
  lat: Number
  lon: Number
  direction: String
  perfil = 'perfil'
  sitesList = new Array()
  city: string
  imgUrl
  openHour: Date
  newShop
  photo
  phone: number
  imageCamera
  color = 'white'
  selection = false
  closeHour: Date
  workingHours = new Array()

  public form = [
    { val: 'Lunes', isChecked: false },
    { val: 'Martes', isChecked: false },
    { val: 'Miercoles', isChecked: false },
    { val: 'Jueves', isChecked: false },
    { val: 'Viernes', isChecked: false },
    { val: 'Sábado', isChecked: false },
    { val: 'Domingo', isChecked: false }
  ];

  constructor(private utilities: Utilities,
    private geolocationService: GeolocationService,
    private shop: ShopService,
    private router: Router,
    private toastController: ToastController,
    private sitesService: SitesService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingCtrlService,
    private alertController: AlertController) {
    setTimeout(() => {
      document.querySelector("ion-searchbar").addEventListener('ionInput', this.handleInput)
    }, 1000)

    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }


    console.log(new Date().getDay() + ' dia de la semana');


    this.sitesService.getSites().subscribe(res => {
      res.forEach(element => {
        this.sitesList.push(element['municipio'])
      });
      this.sitesList.sort()
    })

    this.geolocationService.get().then((res) => {
      this.lat = res.coords.latitude
      this.lon = res.coords.longitude
    }).catch((err) => console.log(err + " hshshsh")
    )
  }

  handleInput(event) {
    const items = Array.from(document.querySelector('footer').children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach(item => {
        this.selection = false
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        (item as HTMLElement).style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  ngOnInit() {
  }


  newBar() {
    let day = 1;
    this.form.forEach(element => {
      if (element.isChecked) {
        this.workingHours.push(day)
        day++;
      } else {
        day++;
      }
    });

    this.newShop = {
      mail: this.utilities.getUser().mail,
      name: this.names,
      nickname: this.nickName,
      description: this.description,
      officeHours: this.workingHours,
      lat: this.lat,
      lon: this.lon,
      barKind: this.kind,
      qualificationList: [],
      likeList: [],
      direction: this.direction,
      city: this.city,
      imageUrl: this.imgUrl,
      phoneToken: this.utilities.getUser().phoneToken,
      openHour: this.openHour,
      closeHour: this.closeHour,
      phone: this.phone
    }
    if (!this.validateFields()) {
      this.presentToast('Todos los campos son obligatorios')
    } else {
      if (this.imageCamera === undefined) {
        this.presentToast('Por favor agrega una imagen')
      } else {
        this.loadingController.present('Estamos registrando tu bar...')
        const pictures = storage().ref(new Date().getTime() + '')
        pictures.putString(this.imageCamera, 'data_url').then(data => {
          pictures.getDownloadURL().then((url) => {
            this.imgUrl = url
            this.newShop = {
              mail: this.utilities.getUser().mail,
              name: this.names,
              nickname: this.nickName,
              description: this.description,
              officeHours: this.workingHours,
              lat: this.lat,
              lon: this.lon,
              barKind: this.kind,
              qualificationList: [],
              likeList: [],
              direction: this.direction,
              city: this.city,
              imageUrl: this.imgUrl,
              phoneToken: this.utilities.getUser().phoneToken,
              openHour: this.openHour,
              closeHour: this.closeHour,
              phone: this.phone
            }
            if (this.validateFields()) {
              this.shop.registryShop(this.newShop).subscribe(res => {
                if (res['status'] === 'succes') {
                  this.loadingController.dismiss()
                  this.presentToast(res['message'])
                  this.utilities.setBar(res['shop'])
                  this.router.navigate(['shop-welcome'])
                } else {
                  this.presentToast('Ha ocurrido un error')
                }
              })
            } else {
            }
          })
        })
      }
    }
  }

  select(site) {
    this.selection = true
    this.city = site
    this.presentAlertConfirm('Has seleccionado ' + this.city + ' correcto?')
  }

  async presentAlertConfirm(message) {
    const alert = await this.alertController.create({
      header: 'Confirma!!',
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Si',
          handler: () => {
            this.newBar()
          }
        }
      ]
    });
    await alert.present();
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

  validateFields() {
    if (this.names === undefined || this.nickName === undefined ||
      this.description === undefined || this.kind === undefined ||
      this.closeHour === undefined || !this.selection || this.phone === undefined
      || this.openHour === undefined || !this.atention()) {
      return false
    } else {
      return true
    }
  }

  atention() {
    let validation = false;
    this.form.forEach(element => {
      if (element.isChecked) {
        validation = true;
      }
    });
    return validation;
  }

}
