import { Utilities } from 'src/app/utilities.js/utilities';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient,
    private utilities: Utilities) { }

  //urlLogin = 'http://localhost:3000/api/users/singin'
  //urlSign = 'http://localhost:3000/api/users/'

  URL_HEROKU_LOGIN = 'https://brindis.pro/api/users/singin'
  URL_HEROKU_SIGIN = 'https://brindis.pro/api/users/'

  login(mail, pass) {
    let data = { mail: mail, password: pass };
    return this.http.post(this.URL_HEROKU_LOGIN, data, this.utilities.getOptionsHeaders())
  }

  signUp(user) {
    return this.http.post(this.URL_HEROKU_SIGIN, user, this.utilities.getOptionsHeaders())
  }

  getUserByMail(usermail: string) {
    return this.http.get<User>(this.URL_HEROKU_SIGIN + 'mail/' +usermail, this.utilities.getOptionsHeaders())
  }
}
