import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  getCommentsByShop(shopId) {
    return this.http.get<BarComment>(this.endPoint.COMMENT_URL + 'shop/' + shopId, this.utilities.getOptionsHeaders())
  }

  addComment(comment) {
    return this.http.post(this.endPoint.COMMENT_URL, comment, this.utilities.getOptionsHeaders())
  }
}
