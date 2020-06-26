import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  constructor(
  ) { 
    setTimeout(()=>{
      if (this.color === undefined) {
        
      } else {
        document.getElementById("back").style.color = this.color
      }
    },1000)
  }

  rou: string;
  @Input('rout') rout: string;

  col: string;
  @Input('color') color: string;
  ngOnInit() {}

}
