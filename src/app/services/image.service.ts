import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private toastController: ToastController) {
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
