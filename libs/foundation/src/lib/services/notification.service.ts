import { Injectable } from '@angular/core';
import { enums  as CoreE, interfaces as CoreI} from '@flexsuite/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  _notifications: BehaviorSubject<CoreI.INotification[]>

  constructor() {
    this._notifications = new BehaviorSubject<CoreI.INotification[]>([]);
  }

  get ob() {
    return this._notifications.asObservable();
  }

  get = (id: string) => this._notifications.getValue().find(n => n.id === id);

  clear = () => this._notifications.next([]);

  list = () => this._notifications.getValue();
  listPush = () => this._notifications.getValue().filter(n => n.type === CoreE.NotificationType.PUSH);
  listSystem = () => this._notifications.getValue().filter(n => n.type === CoreE.NotificationType.DEFAULT);
  listNotRead = () => this._notifications.getValue().filter(n => !n.read);

  count = () => this._notifications.getValue().length;
  countNotRead = () => this._notifications.getValue().filter(n => !n.read).length;
  countSystem = () => this._notifications.getValue().filter(n => n.type === CoreE.NotificationType.DEFAULT).length;
  countPush = () => this._notifications.getValue().filter(n => n.type === CoreE.NotificationType.PUSH).length;

  send(props: CoreI.NotificationSendProps){
    const notifications = this._notifications.getValue();

    const notification: CoreI.INotification = {
      id: Math.random().toString(36).substring(2, 15),
      title: props.title,
      description: props.description,
      type: props.type || CoreE.NotificationType.DEFAULT,
      authorId: props.authorId,
      author: props.author,
      read: props.read || false,
      viewedAt: props.read ? new Date() : undefined,
      createdAt: new Date(),
    };

    notifications.push(notification);
    this._notifications.next(notifications);
  }

  read(id: string) {
    const notifications = this._notifications.getValue();
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      notification.viewedAt = new Date();
      this._notifications.next(notifications);
    }
  }

  readAll() {
    const notifications = this._notifications.getValue();
    notifications.forEach(n => {
      n.read = true;
      n.viewedAt = new Date();
    });
    this._notifications.next(notifications);
  }

  delete(id: string) {
    const notifications = this._notifications.getValue();
    const index = notifications.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.splice(index, 1);
      this._notifications.next(notifications);
    }
  }
}
