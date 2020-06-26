import { LikeService } from './../../services/like.service';
import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Storage } from '@ionic/storage';
import { StatusService } from './../../services/status.service';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Utilities } from './../../utilities.js/utilities';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import firebase from 'firebase'
import { FIREBASE_CONFIG } from './../../firebase.config';
import { storage, initializeApp } from 'firebase'
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.page.html',
  styleUrls: ['./bar-details.page.scss'],
})
export class BarDetailsPage implements OnInit {
  shop: Shop
  direction
  rout = 'user-home'
  qualification
  commentMessage
  comment
  description
  nickname
  statusList: BarStatus[]
  clic = true
  img
  average
  statusImg
  status
  photoImg
  photo: boolean
  likes

  constructor(private http: HttpClient,
    private shopService: ShopService,
    private utilitites: Utilities,
    private loadingController: LoadingCtrlService,
    private statusService: StatusService,
    private router: Router,
    private storage: Storage,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private toastController: ToastController,
    private notificationService: NotificationsService) {

    this.loadingController.present('Obteniendo información del Bar...')

    this.photo = false
    this.photoImg = '/assets/undraw_photos_1nui.svg'

    if (!firebase.apps.length) {
      initializeApp(FIREBASE_CONFIG)
    }

    this.storage.get('perfil').then(res => {
      if (res === null) {
        this.img = "/assets/user.png"
      } else {
        this.img = res
      }
    })

    this.shopService.getShopById(this.utilitites.getShopId()).subscribe(async res => {
      this.shop = res['shop'][0]
      this.like(this.shop.likeList)
      this.storage.get(this.shop._id + "l").then(res => {
        if (res !== null) {
          document.getElementById("likes").style.background = "#3880ff";
          document.getElementById("likes").style.color = "white";
        } else {
          document.getElementById("likes").style.background = "white";
          document.getElementById("likes").style.color = "#3880ff";
        }
      })
      this.direction = await this.getDirection(this.shop.lat, this.shop.lon)
      this.loadingController.dismiss()
      this.getStatus()
      if (this.shop.qualificationList.length === 0) {
        this.average = 0
      } else {
        this.average = Math.round((this.shop.qualificationList.reduce((a, b) => a + b, 0) / this.shop.qualificationList.length) * 10) / 10
      }
    })

    this.storage.get(utilitites.getShopId()).then(res => {
      if (res === null) {
      } else {
        setTimeout(() => {
          switch (res) {
            case 'one':
              this.clic = false
              for (let index = 5; index > 4; index--) {
                document.getElementById('radio' + index).style.color = "orange";
              }
              break;
            case 'two':
              this.clic = false
              for (let index = 5; index > 3; index--) {
                document.getElementById('radio' + index).style.color = "orange";
              }
              break;
            case 'three':
              this.clic = false
              for (let index = 5; index > 2; index--) {
                document.getElementById('radio' + index).style.color = "orange";
              }
              break;
            case 'four':
              this.clic = false
              for (let index = 5; index > 1; index--) {
                document.getElementById('radio' + index).style.color = "orange";
              }
              break;
            case 'five':
              this.clic = false
              for (let index = 5; index > 0; index--) {
                document.getElementById('radio' + index).style.color = "orange";
              }
              break;
          }
        }, 1000)
      }
    })

    /*this.matchService.addMatch({
      shopId: this.utilitites.getShopId(),
      userMail: this.utilitites.getMail(),
      userName: this.utilitites.getName(),
      date: new Date()
    }).subscribe(res=>{
      console.log(res['message']);
    })*/
  }

  /*const actionSheet = await this.actionSheetController.create({
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
  await actionSheet.present();*/

  async selectImage() {
    if (new Date(this.shop.closeHour).getHours() <= 23) {
      if (new Date().getHours() >= new Date(this.shop.openHour).getHours() && new Date().getHours()
        <= new Date(this.shop.closeHour).getHours()) {
        this.image()
      } else {
        this.presentToast('Puedes hacer comentarios a partir la hora de apertura del bar')
      }
    } else {
      if (new Date().getHours() >= new Date(this.shop.openHour).getHours() && new Date().getHours() <= 23 ||
        new Date().getHours() >= 0 && new Date().getHours() < new Date(this.shop.closeHour).getHours()) {
        this.image()
      } else {
        this.presentToast('Puedes hacer comentarios a partir la hora de apertura del bar')
      }
    }
  }

  async image() {
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
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
      const image = 'data:image/jpeg;base64,' + result
      this.photoImg = image
      const pictures = storage().ref(new Date().getTime() + '')
      this.photo = true
      pictures.putString(image, 'data_url').then(data => {
        pictures.getDownloadURL().then((url) => {
          this.statusImg = url
          if (this.utilitites.getBar() !== undefined) {
            this.img = this.utilitites.getBar().imageUrl
          }
        })
      })
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
      const image = 'data:image/jpeg;base64,' + result
      const pictures = storage().ref(new Date().getTime() + '')
      this.photoImg = image
      this.photo = true
      pictures.putString(image, 'data_url').then(data => {
        pictures.getDownloadURL().then((url) => {
          this.statusImg = url
          if (this.utilitites.getBar() !== undefined) {
            this.img = this.utilitites.getBar().imageUrl
          }
        })
      })
    } catch (error) {
    }
  }

  doRefresh(event) {
    this.getStatus()
    setTimeout(() => {
      event.target.complete();
    }, 5000)
  }

  clearFields() {
    this.photoImg = '/assets/undraw_photos_1nui.svg'
    this.statusImg = ''
    this.description = ""
    this.photo = false
  }

  validateFields() {
    if (this.description === undefined) {
      return false
    } else {
      return true
    }
  }


  getStatus() {
    /*if (new Date().getHours() >= new Date(this.shop.openHour).getHours() && new Date().getHours() <= 23 ||
  new Date().getHours() >= 0 && new Date().getHours() < 8) {*/
    if (new Date(this.shop.closeHour).getHours() <= 23) {
      if (new Date().getHours() >= new Date(this.shop.openHour).getHours() && new Date().getHours()
        <= new Date(this.shop.closeHour).getHours()) {
        this.statusService.getStatusByShop(this.utilitites.getShopId()).subscribe(res => {
          if (res['message'] === undefined) {
            this.statusList = res['status'];
          } else {
            this.commentMessage = res['message']
          }
        });
      } else {
        this.presentToast('Los estados se pueden ver a partir de la hora de apertura del bar')
      }
    } else {
      if (new Date().getHours() >= new Date(this.shop.openHour).getHours() && new Date().getHours() <= 23 ||
        new Date().getHours() >= 0 && new Date().getHours() < new Date(this.shop.closeHour).getHours()) {
        this.statusService.getStatusByShop(this.utilitites.getShopId()).subscribe(res => {
          if (res['message'] === undefined) {
            this.statusList = res['status'];
          } else {
            this.commentMessage = res['message']
          }
        });
      } else {
        this.presentToast('Los estados se pueden ver a partir de la hora de apertura del bar')
      }
    }
  }

  ngOnInit() {
  }

  one() {
    if (this.clic) {
      this.clic = false
      this.storage.set(this.utilitites.getShopId(), 'one')
      this.shopService.addQualification(1, this.utilitites.getShopId()).subscribe(res => {
        this.getAverage();
      })
    } else {
    }
  }

  two() {
    if (this.clic) {
      this.clic = false
      this.storage.set(this.utilitites.getShopId(), 'two')
      this.shopService.addQualification(2, this.utilitites.getShopId()).subscribe(res => {
        this.getAverage();
      })
    } else {
    }
  }
  three() {
    if (this.clic) {
      this.clic = false
      this.storage.set(this.utilitites.getShopId(), 'three')
      this.shopService.addQualification(3, this.utilitites.getShopId()).subscribe(res => {
        this.getAverage();
      })
    } else {
    }
  }
  four() {
    if (this.clic) {
      this.clic = false
      this.storage.set(this.utilitites.getShopId(), 'four')
      this.shopService.addQualification(4, this.utilitites.getShopId()).subscribe(res => {
        this.getAverage();
      })
    } else {
    }
  }
  five() {
    if (this.clic) {
      this.clic = false
      this.storage.set(this.utilitites.getShopId(), 'five')
      this.shopService.addQualification(5, this.utilitites.getShopId()).subscribe(res => {
        this.getAverage();
      })
    } else {
    }
  }

  getAverage() {
    let list: [];
    this.shopService.getShopById(this.utilitites.getShopId).subscribe(res => {
      list = res['shop'][0]['qualificationList'];
      if (list !== undefined || list !== null) {
        if (list.length === 0) {
          this.average = 0;
        }
        else {
          this.average = Math.round((list.reduce((a, b) => a + b, 0) / list.length) * 10) / 10;
        }
      } else {
      }
    });
  }

  addStatus() {
    if (new Date().getHours() >= new Date(this.shop.openHour).getHours() && new Date().getHours() <= 23 ||
      new Date().getHours() >= 0 && new Date().getHours() < 8) {
      if (!this.validateFields()) {

      } else {
        if (this.photo) {
          this.getNewStatus('photo')
          this.loadingController.present('Agregando tu estado...')
          this.statusService.addStatus(this.status).subscribe(res => {
            this.loadingController.dismiss()
            this.clearFields()
            this.getStatus()
          })
        } else {
          this.getNewStatus('')
          this.loadingController.present('Agregando tu estado...')
          this.statusService.addStatus(this.status).subscribe(res => {
            this.loadingController.dismiss()
            this.sendNotification('Ha agregado un estado en tu bar')
            this.clearFields()
            this.getStatus()
          })
        }
      }
    } else {
      this.presentToast('Puedes subir estados a partir de la hora de apertura del bar')
      this.description = ''
    }
  }

  sendNotification(message) {
    const notification = {
      "notification": {
        "title": "Brindis bar manager",
        "body": this.utilitites.getUser().nickname + " " + message
      },
      "to": this.utilitites.getBarToken()
    }
    this.notificationService.sendNotification(notification).subscribe(res => {
      if (res['failure'] === 1) {
      } else {
      }
    })
  }

  getNewStatus(photo) {
    if (photo === 'photo') {
      if (this.utilitites.getBar() === undefined) {
        this.status = {
          date: new Date(),
          description: this.description,
          userMail: this.utilitites.getMail(),
          nickname: this.utilitites.getUser().nickname,
          shopId: this.utilitites.getShopId(),
          initHour: new Date(),
          statusImg: this.statusImg,
          avatarImg: this.utilitites.getBar().imageUrl
        }
      } else {
        this.status = {
          date: new Date(),
          description: this.description,
          userMail: this.utilitites.getMail(),
          nickname: this.utilitites.getBar().name,
          shopId: this.utilitites.getShopId(),
          initHour: new Date(),
          statusImg: this.statusImg,
          avatarImg: this.img
        }
      }
    } else {
      if (this.utilitites.getBar() === undefined) {
        this.status = {
          date: new Date(),
          description: this.description,
          userMail: this.utilitites.getMail(),
          nickname: this.utilitites.getUser().nickname,
          shopId: this.utilitites.getShopId(),
          initHour: new Date(),
          statusImg: null,
          avatarImg: this.img
        }
      } else {
        this.status = {
          date: new Date(),
          description: this.description,
          userMail: this.utilitites.getMail(),
          nickname: this.utilitites.getBar().name,
          shopId: this.utilitites.getShopId(),
          initHour: new Date(),
          statusImg: null,
          avatarImg: this.utilitites.getBar().imageUrl
        }
      }
    }

  }

  presentComments() {
    this.router.navigate(['bar-comments'])
  }

  async getDirection(lat, lon) {

    const TU_LLAVE = 'AIzaSyDzki9300eTYsBUDfjV4s3NHScdwfgFgpU';
    this.http.get<{ status: string, results: any[] }>(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng='
      + lat + ',' + lon + '&key=' + TU_LLAVE, { responseType: 'json' }).subscribe(e => {
        if (e.status === 'OK') {
          return e.results[0].formatted_address
        } else {
          return lat + " -- " + lon;
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
    }else{
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
            hours += 'Lun'
            break;
          case 2:
            hours += ' Mar'
            break;
          case 3:
            hours += ' Mie'
            break;
          case 4:
            hours += ' Jue'
            break;
          case 5:
            hours += ' Vie'
            break;
          case 6:
            hours += ' Sab'
            break;
          case 7:
            hours += ' Dom'
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

  addLike() {
    if (document.getElementById("likes").style.background === 'white') {
      this.storage.set(this.utilitites.getShopId() + "l", "like").then(res => { });
      document.getElementById("likes").style.background = "#3880ff";
      document.getElementById("likes").style.color = "white";
      this.shopService.addLike(this.utilitites.getUser().nickname, this.utilitites.getShopId()).subscribe(res => {
        this.shopService.getShopById(this.utilitites.getShopId()).subscribe(res => {
          this.like(res['shop'][0]['likeList'])
        })
      })
      this.sendNotification('Le gusta tu bar')
    } else {
      this.storage.remove(this.utilitites.getShopId() + "l").then(res => { });
      document.getElementById("likes").style.background = "white";
      document.getElementById("likes").style.color = "#3880ff";
      this.shopService.quitLike(this.utilitites.getUser().nickname, this.utilitites.getShopId()).subscribe(res => {
        this.shopService.getShopById(this.utilitites.getShopId()).subscribe(res => {
          this.like(res['shop'][0]['likeList'])
        })
      })
      this.sendNotification('Le ha dejado de gustar tu bar')

    }

  }
}
