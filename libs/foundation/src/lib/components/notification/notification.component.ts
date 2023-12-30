import { Component, NgZone, OnInit } from '@angular/core';
import { enums  as CoreE, interfaces as CoreI} from '@flexsuite/core';
import { NotificationService } from '../../services';

@Component({
  selector: 'foundation-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit{
  icons = CoreE.NotificationIcon;
  _notifications: CoreI.INotification[] = []
  private _allNotifications: CoreI.INotification[] = []
  private TIME_TO_DESTROY = 2000; // 2 seconds

  constructor(
    private notificationService: NotificationService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.notificationService.listNotRead().subscribe((notifications) => this.checkNotifications(notifications))
    this.notificationService.list().subscribe((notifications) => this._allNotifications = notifications)
  }

  checkNotifications(notifications: CoreI.INotification[]) {
    notifications.forEach( notification => {
      console.log(`Verificando notificação ${notification.id}`)
      //Já existe?
      if(this._notifications.find( n => n.id === notification.id)) return;
      //Não existe?
      else {
        console.log(`Notificação ${notification.id} não existe`)
        const tempNotification = this._allNotifications.find( n => n.id === notification.id);

        //Achou na lista geral?
        if(tempNotification) {
          console.log(`Notificação ${notification.id} achada na lista geral`)
          //Não foi lido?
          if(!tempNotification.read) {
            console.log(`Notificação ${notification.id} não foi lida`)
            //Exibe notificação
            this.showNotification(tempNotification);
          }
        }else {
          //Não achou na lista geral, então remove da lista de notificações
          this._notifications = this._notifications.filter( n => n.id !== notification.id);
        }
      }

    })
  }

  showNotification(notification: CoreI.INotification) {
    console.log(`Exibindo notificação ${notification.id}`)
    this._notifications.push(notification);
    this.zone.run(() => {})
    const $notification = document.getElementById(`notification-${notification.id}`);
    console.log($notification)
  }

}
