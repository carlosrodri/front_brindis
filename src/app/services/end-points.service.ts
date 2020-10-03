import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointsService {
  ATTEND_URL = 'https://brindis.pro/api/attends/'
  CODE_URL = 'https://brindis.pro/api/codes/'
  COMMENT_URL = 'https://brindis.pro/api/comments/'
  EVENT_URL = 'https://brindis.pro/api/events'
  INTERESTED_URL = 'https://brindis.pro/api/interesteds'
  MATCH_URL = 'https://brindis.pro/api/matches/'
  PAYMENT_URL = 'https://brindis.pro/api/payments/'
  REPORT_URL = 'https://brindis.pro/api/reports'
  SHOPS_URL = 'https://brindis.pro/api/shops'
  SHOPS_URL_MAIL = 'https://brindis.pro/api/shops/mail/'
  SITES_URL = 'https://brindis.pro/api/sites/'
  STATUS_URL = 'https://brindis.pro/api/states/'
  USER_LOGGIN_URL = 'https://brindis.pro/api/users/singin'
  USER_SIGNIN_URL = 'https://brindis.pro/api/users/'

  constructor() {
    this.proofUrl();
  }

  productionsUrl() {
    this.ATTEND_URL = 'https://brindis.pro/api/attends/'
    this.CODE_URL = 'https://brindis.pro/api/codes/'
    this.COMMENT_URL = 'https://brindis.pro/api/comments/'
    this.EVENT_URL = 'https://brindis.pro/api/events'
    this.INTERESTED_URL = 'https://brindis.pro/api/interesteds'
    this.MATCH_URL = 'https://brindis.pro/api/matches/'
    this.PAYMENT_URL = 'https://brindis.pro/api/payments/'
    this.REPORT_URL = 'https://brindis.pro/api/reports'
    this.SHOPS_URL = 'https://brindis.pro/api/shops'
    this.SHOPS_URL_MAIL = 'https://brindis.pro/api/shops/mail/'
    this.SITES_URL = 'https://brindis.pro/api/sites/'
    this.STATUS_URL = 'https://brindis.pro/api/states/'
    this.USER_LOGGIN_URL = 'https://brindis.pro/api/users/singin'
    this.USER_SIGNIN_URL = 'https://brindis.pro/api/users/'
  }

  proofUrl() {
    this.ATTEND_URL = 'http://localhost:3002/api/attends/'
    this.CODE_URL = 'http://localhost:3002/api/codes/'
    this.COMMENT_URL = 'http://localhost:3002/api/comments/'
    this.EVENT_URL = 'http://localhost:3002/api/events'
    this.INTERESTED_URL = 'http://localhost:3002/api/interesteds'
    this.MATCH_URL = 'http://localhost:3002/api/matches/'
    this.PAYMENT_URL = 'http://localhost:3002/api/payments/'
    this.REPORT_URL = 'http://localhost:3002/api/reports'
    this.SHOPS_URL = 'http://localhost:3002/api/shops'
    this.SHOPS_URL_MAIL = 'http://localhost:3002/api/shops/mail/'
    this.SITES_URL = 'http://localhost:3002/api/sites/'
    this.STATUS_URL = 'http://localhost:3002/api/states/'
    this.USER_LOGGIN_URL = 'http://localhost:3002/api/users/singin'
    this.USER_SIGNIN_URL = 'http://localhost:3002/api/users/'
  }
}
