import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.page.html',
  styleUrls: ['./user-welcome.page.scss'],
})
export class UserWelcomePage implements OnInit {
  name
  URL_HEROKU_MESSAGE = 'https://brindis.pro/api/message/'
  constructor(private utilities: Utilities,
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController) {

    this.name = this.utilities.getUser().nickname
  }

  ngOnInit() {
  }

  ok() {
    this.router.navigate(['user-home'])
    this.http.get(this.URL_HEROKU_MESSAGE, this.utilities.getOptionsHeaders()).subscribe(res=>{
      if (res['status'] === 'ok') {
        this.presentAlert(res['message'])
      } else {
      }
    })
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'IMPORTANTE',
      subHeader: 'Aviso',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
