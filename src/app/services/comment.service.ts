import { Utilities } from 'src/app/utilities.js/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  URL_HEROKU_COMMENTS = 'https://brindis.pro/api/comments/'
  //URi = 'http://localhost:3000/api/comments'

  getCommentsByShop(shopId) {
    return this.http.get<BarComment>(this.URL_HEROKU_COMMENTS + 'shop/' + shopId, this.utilities.getOptionsHeaders())
  }

  addComment(comment) {
    return this.http.post(this.URL_HEROKU_COMMENTS, comment, this.utilities.getOptionsHeaders())
  }
}
