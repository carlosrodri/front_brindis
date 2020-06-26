import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Storage } from '@ionic/storage';
import { ShopService } from './../../services/shop.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit {
  bar: Shop
  barList: Shop[]
  siteList
  city: String
  description
  barNameFilter: string
  localList = new Array()

  constructor(private utilities: Utilities,
    private shopService: ShopService,
    private storage: Storage,
    private loadingCtrl: LoadingCtrlService) {

    this.getShopsByCity();

  }

  private getShopsByCity() {
    this.loadingCtrl.present('Obteniendo bares en tu ciudad');
    this.storage.get('city').then(res => {
      this.city = res;
      this.bar = this.utilities.getBar();
      this.shopService.getShopByCity(res).subscribe(shop => {
        this.loadingCtrl.dismiss()
        this.barList = shop['shops']
        this.localList = shop['shops']
        if (this.barList.length === 0) {
          this.description = 'No hay bares en esta ciudad por el momento, intenta seleccionando otra ciudad en el menú de tu perfil'
        } else {
          this.description = 'Bares en ' + this.city
          this.sortByPuntuation()
        }
      });
    });
  }

  doRefresh(event) {
    this.getShopsByCity()
    setTimeout(() => {
      event.target.complete();
    }, 2000)
  }

  filter() {
    if (this.barNameFilter === '' || this.barNameFilter.length <= 1) {
      this.barList = this.localList
      this.description = 'Bares en ' + this.city
    } else {
      let barFilter = new Array()
      this.barList = this.localList
      this.barList.forEach(bar => {
        if (bar.name.toUpperCase().indexOf(this.barNameFilter.toUpperCase()) !== -1) {
          barFilter.push(bar)
        } else {
        }
      })
      if (barFilter.length > 0) {
        this.description = 'Resultados de tu búsqueda'
      } else {
        this.description = 'No hay resultados con tu búsqueda'
      }
      this.barList = barFilter
      return barFilter
    }
  }

  sortByPuntuation() {
   this.barList.forEach(element => {
     console.log(element + ' sin ordernar');
   });
    
    this.barList.sort((a, b)=> {
      if (this.getAverage(a.qualificationList) < this.getAverage(b.qualificationList)) {
        return -1;
      }
      if (this.getAverage(a.qualificationList) > this.getAverage(b.qualificationList)) {
        return 1;
      }
      // a debe ser igual b
      return 0;
    })

    this.barList.forEach(element => {
      console.log(element);
      console.log('ordenado');
    });
  }

  getAverage(list) {
    let parts: String[] = list.split(",")
    return parts.reduce((a, b) => Number(a) + Number(b), 0) / parts.length
  }

  ngOnInit() {
  }

}
