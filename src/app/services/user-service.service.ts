import { EndPointsService } from './end-points.service';
import { Utilities } from 'src/app/utilities.js/utilities';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient,
    private utilities: Utilities, private endPoint: EndPointsService) { }

  login(mail, pass) {
    let data = { mail: mail, password: pass };
    return this.http.post(this.endPoint.USER_LOGGIN_URL, data, this.utilities.getOptionsHeaders())
  }

  signUp(user) {
    return this.http.post(this.endPoint.USER_SIGNIN_URL, user, this.utilities.getOptionsHeaders())
  }

  getUserByMail(usermail: string) {
    return this.http.get<User>(this.endPoint.USER_SIGNIN_URL + 'mail/' +usermail, this.utilities.getOptionsHeaders())
  }
}
