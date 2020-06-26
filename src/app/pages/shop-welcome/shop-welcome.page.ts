import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-welcome',
  templateUrl: './shop-welcome.page.html',
  styleUrls: ['./shop-welcome.page.scss'],
})
export class ShopWelcomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ok(){
    this.router.navigate(['bar-window'])
  }
}
