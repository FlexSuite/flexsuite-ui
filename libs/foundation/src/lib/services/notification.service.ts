import { Injectable } from '@angular/core';
import { CoreEnums as CoreE, CoreInterfaces as CoreI} from '@flexsuite/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications: BehaviorSubject<CoreI.INotification[]>

  constructor() {
    this._notifications = new BehaviorSubject<CoreI.INotification[]>([]);
  }

  get ob() {
    return this._notifications.asObservable();
  }

  get = (id: string) => this._notifications.getValue().find(n => n.id === id);

  clear = () => this._notifications.next([]);

  list = () => this._notifications.asObservable();
  listNotRead = () => this._notifications.pipe(map(n => n.filter(n => !n.read)));
  listPush = () => this._notifications.pipe(map(n => n.filter(n => !n.system)));
  listPushNotRead = () => this._notifications.pipe(map(n => n.filter(n => !n.system && !n.read)));
  listSystem = () => this._notifications.pipe(map(n => n.filter(n => n.system)));
  listSystemNotRead = () => this._notifications.pipe(map(n => n.filter(n => n.system && !n.read)));

  count = () => this._notifications.pipe(map(n => n.length));
  countNotRead = () => this._notifications.pipe(map(n => n.filter(n => !n.read).length));
  countPush = () => this._notifications.pipe(map(n => n.filter(n => !n.system).length));
  countPushNotRead = () => this._notifications.pipe(map(n => n.filter(n => !n.system && !n.read).length));
  countSystem = () => this._notifications.pipe(map(n => n.filter(n => n.system).length));
  countSystemNotRead = () => this._notifications.pipe(map(n => n.filter(n => n.system && !n.read).length));

  error({title, description}:{title?: string, description: string}) {
    this.send({
      title : title || 'Erro',
      description,
      type: CoreE.NotificationType.ERROR,
    });
  }

  alert({title, description}:{title?: string, description: string}) {
    this.send({
      title : title || 'Alerta',
      description,
      type: CoreE.NotificationType.WARNING,
    });
  }

  success({title, description}:{title?: string, description: string}) {
    this.send({
      title : title || 'Sucesso',
      description,
      type: CoreE.NotificationType.SUCCESS,
    });
  }

  send(props: CoreI.NotificationSendProps | string){
    const notifications = this._notifications.getValue();

    if(typeof props === 'string' || props instanceof String){
      const notification: CoreI.INotification = {
        id: Math.random().toString(36).substring(2, 15),
        title: 'Sem título',
        description: props as string,
        type: CoreE.NotificationType.INFO,
        system: true,
        authorId: undefined,
        author: undefined,
        read: false,
        viewedAt: undefined,
        createdAt: new Date(),
      };

      notifications.push(notification);
      this._notifications.next(notifications);
      return
    }

    const notification: CoreI.INotification = {
      id: Math.random().toString(36).substring(2, 15),
      title: props.title || 'Sem título',
      description: props.description,
      type: props.type || CoreE.NotificationType.INFO,
      system: props.system || true,
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
