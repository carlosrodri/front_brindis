import { Router } from '@angular/router';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-bar',
  templateUrl: './card-bar.component.html',
  styleUrls: ['./card-bar.component.scss'],
})
export class CardBarComponent implements OnInit {

  nam: string;
  @Input('name') name: string;

  kin: string;
  @Input('kind') kind: string;

  hou: string;
  @Input('hour') hour: Date;

  clo: string;
  @Input('closeHour') closeHour: Date;

  cit: string;
  @Input('city') city: string;

  id: string;
  @Input('barId') barId: string;

  im: string;
  @Input('img') img: string;

  @Input('list') list: string;

  @Input('likeList') likeList: string;

  @Input('phoneToken') phoneToken: string;

  @Input('working_hours') working_hour: string;

  average
  working_hours = new Array()

  constructor(private utilities: Utilities,
    private router: Router) {
     }

  ngOnInit() { }

  details() {
    this.utilities.setShopId(this.barId)
    this.utilities.setTokenBar(this.phoneToken)
    this.router.navigate(['bar-details'])
  }

  getAverage() {
    let parts: String[] = this.list.split(",")
    return parts.reduce((a, b) => Number(a) + Number(b), 0) / parts.length
  }

  open() {
    let validate = false
    if (this.working_hour !== null) {
      this.working_hour.split(',').forEach(element => {
        if (Number(element) === new Date().getDay()) {
          validate = true
        }
      });
    }

    if (validate) {
      if (new Date(this.closeHour).getHours() <= 23) {
        if (new Date().getHours() >= new Date(this.hour).getHours() && new Date().getHours()
          <= new Date(this.closeHour).getHours()) {
          document.getElementById("open").style.color = "green"
          return 'Abierto'
        } else {
          document.getElementById("open").style.color = "red"
          return 'Cerrado'
        }
      } else {
        if (new Date().getHours() >= new Date(this.hour).getHours() && new Date().getHours() <= 23 ||
          new Date().getHours() >= 0 && new Date().getHours() < new Date(this.closeHour).getHours()) {
          document.getElementById("open").style.color = "green"
          return 'Abierto'
        } else {
          document.getElementById("open").style.color = "red"
          return 'Cerrado'
        }
      }
    } else {
      document.getElementById("open").style.color = "red"
      return 'Cerrado'
    }
  }

  getLikes() {
    let parts: String[] = this.likeList.split(",")
    if (parts[0] === "") {
      return '0 Me gusta'
    } else {
      return parts.length + ' Me gusta'
    }
  }
}