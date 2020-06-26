import { LoadingCtrlService } from './../../services/loading-ctrl.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Utilities } from './../../utilities.js/utilities';
import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-bar-comments',
  templateUrl: './bar-comments.page.html',
  styleUrls: ['./bar-comments.page.scss'],
})
export class BarCommentsPage implements OnInit {

  commentList: []
  comment
  barName
  rout = 'bar-details'
  img
  commentC

  constructor(private commentService: CommentService,
    private utilitites: Utilities,
    private loadingController: LoadingCtrlService,
    private toastController: ToastController,
    private storage: Storage,
    private notificationService: NotificationsService) {

    this.storage.get('perfil').then(res => {
      if (res === null) {
        this.img = '/assets/user.png'
      } else {
        this.img = res
      }
    })

    this.getComments()
    if (this.utilitites.getBar() === undefined) {

    } else {
      this.barName = 'Comentarios de ' + this.utilitites.getBar().name
    }
  }
  commentMessage

  ngOnInit() {
  }


  addComment() {
    if (this.comment === undefined) {

    } else {
      if (this.utilitites.getBar() === undefined) {
        this.commentC = {
          date: new Date(),
          description: this.comment,
          userMail: this.utilitites.getMail(),
          nickname: this.utilitites.getUser().nickname,
          shopId: this.utilitites.getShopId(),
          imageUrl: this.img
        }
      } else {
        this.commentC = {
          date: new Date(),
          description: this.comment,
          userMail: this.utilitites.getMail(),
          nickname: this.utilitites.getBar().name,
          shopId: this.utilitites.getShopId(),
          imageUrl: this.utilitites.getBar().imageUrl
        }
      }

      this.loadingController.present('Agregando comentario...')
      this.commentService.addComment(this.commentC).subscribe(res => {
        this.sendNotification()
        this.loadingController.dismiss()
        this.presentToast(res['message'])
        this.getComments()
        this.comment = ''
      })
    }
  }

  sendNotification() {
    if (this.utilitites.getUser().phoneToken === this.utilitites.getBarToken()) {
    } else {
      const notification = {
        "notification": {
          "title": "Brindis bar manager",
          "body": this.utilitites.getUser().name + " ha realizado un comentario a tu bar"
        },
        "to": this.utilitites.getBarToken()
      }
      this.notificationService.sendNotification(notification)
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  private getComments() {
    this.commentService.getCommentsByShop(this.utilitites.getShopId()).subscribe(res => {
      if (res['message'] === undefined) {
        this.commentList = res['comments'];
        this.commentList.reverse();
      } else {
        this.commentMessage = res['message']
      }
    });
  }
}
