import { Component } from '@angular/core';
import { notificationIcon } from '@flexsuite/core/icons';
import { INotificationItem } from '@flexsuite/core/interfaces';

@Component({
  selector: 'workspace-navbar-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  icon = notificationIcon;

  notifications: INotificationItem[] = [
    {
      id: 0,
      title: 'Novo Modulo Liberado!',
      description: 'O módulo de Suprimentos foi liberado para uso!',
      date: this.getRandomDate(),
      from: 'FlexSuite',
      read: false,
    },
    {
      id: 1,
      title: 'Novo Modulo Liberado!',
      description: 'O módulo de Faturamento foi liberado para uso!',
      date: this.getRandomDate(),
      from: 'FlexSuite',
      read: false,
    },
    {
      id: 2,
      title: 'Novo Modulo Liberado!',
      description: 'O módulo de Gestão foi liberado para uso!',
      date: this.getRandomDate(),
      from: 'FlexSuite',
      read: false,
    },
  ];

  getRandomDate() {
    const now = new Date();
    const random = Math.floor(Math.random() * 10080);
    const date = new Date(now.getTime() - random * 60000);
    return date;
  }

  getNotificationDateFormatted(date: Date) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  getMinutesFromNotification(date: Date){
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 1000 / 60)

    if(minutes === 0) return 'Agora'
    if(minutes === 1) return 'Alguns seguns atrás'
    if(minutes > 2 && minutes < 60) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`
    if(minutes >= 60 && minutes < 1440) return `${Math.floor(minutes / 60)} hora${Math.floor(minutes / 60) > 1 ? 's' : ''} atrás`
    if(minutes >= 1440 && minutes < 10080) return `${Math.floor(minutes / 1440)} dia${Math.floor(minutes / 1440) > 1 ? 's' : ''} atrás`
    if(minutes >= 10080 && minutes < 40320) return `${Math.floor(minutes / 10080)} semana${Math.floor(minutes / 10080) > 1 ? 's' : ''} atrás`
    if(minutes >= 40320 && minutes < 525600) return `${Math.floor(minutes / 40320)} m${Math.floor(minutes / 40320) > 1?'ê':'e'}s${Math.floor(minutes / 40320) > 1 ? 'es' : ''} atrás`
    if(minutes >= 525600) return `${Math.floor(minutes / 525600)} ano${Math.floor(minutes / 525600) > 1 ? 's' : ''} atrás`
    return ''
  }
}
