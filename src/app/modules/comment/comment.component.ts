import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  usermai: string;
  @Input('usermail') usermail: string;

  commen: string;
  @Input('comment') comment: string;

  nick: string;
  @Input('nickname') nickname: string;

  im: string;
  @Input('img') img: string;

  constructor(private userService: UserServiceService) {
  }


  ngOnInit() { }



}
