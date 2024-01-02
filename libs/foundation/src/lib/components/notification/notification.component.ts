import { Component, NgZone, OnInit } from '@angular/core';
import { CoreInterfaces as CoreI} from '@flexsuite/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'foundation-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit{

  _toastNotifications: CoreI.INotification[] = []
  private _allNotifications: CoreI.INotification[] = []
  private TIME_TO_DESTROY = 2000; // 2 seconds

  constructor(
    private notificationService: NotificationService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.notificationService.listSystemNotRead().subscribe((notifications) => this.checkToastNotification(notifications))
    this.notificationService.list().subscribe((notifications) => this._allNotifications = notifications)
  }

  checkToastNotification(notifications: CoreI.INotification[]) {
    notifications.forEach( notification => {
      //Já existe?
      if(this._toastNotifications.find( n => n.id === notification.id)) return;
      //Não existe?
      else {
        const tempNotification = this._allNotifications.find( n => n.id === notification.id);

        //Achou na lista geral?
        if(tempNotification) {
          //Não foi lido?
          if(!tempNotification.read) {
            //Exibe notificação
            this.showNotification(tempNotification);
          }
        }else {
          //Não achou na lista geral, então remove da lista de notificações
          this._toastNotifications = this._toastNotifications.filter( n => n.id !== notification.id);
        }
      }

    })
  }

  showNotification(notification: CoreI.INotification) {
    this._toastNotifications.push(notification);
    this.zone.run(() => {})
  }

}
