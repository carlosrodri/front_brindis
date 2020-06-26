import { FCM } from '@ionic-native/fcm/ngx/';
import { ShopService } from 'src/app/services/shop.service';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { FIREBASE_CONFIG } from './../../firebase.config';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { storage, initializeApp } from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import firebase from 'firebase'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  password: String
  mail: String
  confirm: String
  names: String
  nickName: String
  token: String
  user
  imgUrl
  photo
  imageCamera
  phoneToken

  constructor(private toastController: ToastController,
    private service: UserServiceService,
    private rouer: Router, private utilities: Utilities,
    private loadingController: LoadingCtrlService,
    private storage: Storage,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private shopService: ShopService,
    private fcm: FCM) {

    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }

  }
  ngOnInit() {
    this.fcm.getToken().then(token => {
      this.phoneToken = token
    });
  }

  signUp() {
    if (this.password === undefined || this.confirm === undefined || this.mail === undefined
      || this.names === undefined || this.nickName === undefined) {
      this.presentToast('Todos los campos son obligatorios')
    } else {
      if (this.validarEmail(this.mail)) {
        if (this.password !== this.confirm) {
          this.presentToast(' Las contraseñas no coinciden, por favor verifica ')
        } else {
          if (this.imageCamera === undefined) {
            this.presentToast('Por favor selecciona una imagen')
          } else {
            this.loadingController.present('Espera un momento, te estamos registrando...')
            const pictures = storage().ref(new Date().getTime() + '')
            pictures.putString(this.imageCamera, 'data_url').then(data => {
              pictures.getDownloadURL().then((url) => {
                this.imgUrl = url
                this.user = {
                  mail: this.mail,
                  name: this.names,
                  nickname: this.nickName,
                  password: this.password,
                  imageUrl: this.imgUrl,
                  phoneToken: this.phoneToken
                }
                if (this.validateFields()) {
                  this.service.signUp(this.user).subscribe(res => {
                    this.loadingController.dismiss()
                    this.setDatas(res)
                  })
                } else {
                  this.presentToast('Ha ocurrido un error, vuelve a intentarlo|')
                }
              })
            })
          }
        }
      } else {
        this.presentToast('Ingresa una dirección de correo válida')
      }
    }
  }

  private setDatas(datas: Object) {
    if (datas['status'] === 'error') {
      this.presentToast(datas['message']);
    } else {
      this.presentToast(datas['message']);
      this.userHome();
      this.token = datas['token'];
      this.utilities.setUser(datas['user'])
      this.storage.set('password', this.password).then(res => { })
      this.storage.set('mail', datas['user']['mail']).then(res => { })
      this.storage.set('perfil', datas['user']['imageUrl']).then(res => { })
      this.shopService.getShopByMail(this.utilities.getUser().mail).subscribe(res => {
        if (res['status'] === 'error') {
        } else {
          this.utilities.setBar(res['shop'])
        }
      })
    }
  }

  validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      return true
    } else {
      return false
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  userHome() {
    this.rouer.navigate(['city'])
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
      document.getElementById('photo').style.backgroundImage = result
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
    if (this.password === undefined || this.confirm === undefined || this.mail === undefined
      || this.names === undefined || this.nickName === undefined) {
      return false
    } else {
      return true
    }
  }

}
