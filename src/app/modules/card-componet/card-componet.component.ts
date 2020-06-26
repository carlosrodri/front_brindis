import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core'

@Component({
  selector: 'app-card-componet',
  templateUrl: './card-componet.component.html',
  styleUrls: ['./card-componet.component.scss'],
})
export class CardComponetComponent implements OnInit {
  date: string;
  @Input('date') dat: string;

  shop: string;
  @Input('shop') sho: string;

  hour: string;
  @Input('hour') hou: string;

  constructor() { }

  ngOnInit() {}

}
