import { Storage } from '@ionic/storage';
import { Utilities } from 'src/app/utilities.js/utilities';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  perfil

  constructor(private shopService: ShopService,
    private utilities: Utilities,
    private storage: Storage) {

      this.storage.get('perfil').then(res => {
        if (res === null) {
          this.perfil = 'assets/userBig.png'
        } else {
          this.perfil = res
        }
      })

    this.shopService.getShopByMail(this.utilities.getMail()).subscribe(res => {
      if (res['status'] === 'error') {
      } else {
      }
    })
  }

  ngOnInit() {
  }

  putBar() {

  }

}
