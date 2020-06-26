import { InterestedService } from './../../services/interested.service';
import { AttendService } from './../../services/attend.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  b: boolean;
  i: boolean
  constructor(private router: Router,
    private utilities: Utilities,
    private inetrestedService: InterestedService,
    private attendService: AttendService) {
    this.i = true
    this.b = true
  }
  dat: string;
  @Input('date') date: string;

  sho: string;
  @Input('shop') shop: string;

  hou: string;
  @Input('hour') hour: string;

  sh: string;
  @Input('shopImg') shopImg: string;

  even: string;
  @Input('event') event: string;

  id: string;
  @Input('idEvent') idEvent: string;

  icov: string;
  @Input('cover') cover: string;

  des: string;
  @Input('description') description: string;

  @Input('eventImg') eventImg: string;

  ngOnInit() { }


  eventDetails() {
    this.router.navigate(['event-details'])
    this.utilities.setEventId(this.idEvent)
  }

}
