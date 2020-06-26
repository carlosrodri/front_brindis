import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingCtrlService {
  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present(message) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: message,
      duration: 120000
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log(''));
  }
}
