import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SitesService } from './../../services/sites.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  sitesList = new Array()

  constructor(private sitesService: SitesService,
    private storage: Storage,
    private router: Router,
    private loadingCtrl: LoadingCtrlService) {
    setTimeout(() => {
      document.querySelector("ion-searchbar").addEventListener('ionInput', this.handleInput)
    }, 1000)

    loadingCtrl.present('Obteniendo las ciudades...')
    this.sitesService.getSites().subscribe(res => {
      res.forEach(element => {
        this.sitesList.push(element['municipio'])
      });
      this.sitesList.sort()
      this.loadingCtrl.dismiss()
    })
  }

  select(site) {
    this.loadingCtrl.present('Recuerda que la vida es para vivirla...')
    this.storage.set('city', site).then(res => {
      this.loadingCtrl.dismiss()
      this.router.navigate(['user-welcome'])
    })
  }

  handleInput(event) {
    const items = Array.from(document.querySelector('footer').children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        (item as HTMLElement).style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  ngOnInit() {
  }

}
