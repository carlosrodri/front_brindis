import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'true',
    Authorization: "key=AAAArI5YRq0:APA91bFkX3eSZpWQ0TL-Aak-JlILUspxfSb4462XxdKRf88bdV7VPxMvC2j_jE39OCVkM39l1zRAWzRtYa2zok8zIM0sE3oJnkqagpi0mcCfCKb8hv4EAgPvmpULrqRPDn8Xd5GGHlFu"
  });
  options = { headers: this.headers }
  
  constructor(private http: HttpClient) { }

  sendNotification(notification) {
    return this.http.post('https://fcm.googleapis.com/fcm/send', notification, this.options)
  }
}
