import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  perfil

  constructor(private router: Router,
    private storage: Storage) {
    this.storage.get('perfil').then(res => {
      if (res === null) {
        this.perfil = 'assets/userBig.png'
      } else {
        this.perfil = res
      }
    })
  }

  ngOnInit() { }

  myPerfil() {
    this.router.navigate(['perfil'])
  }
}
