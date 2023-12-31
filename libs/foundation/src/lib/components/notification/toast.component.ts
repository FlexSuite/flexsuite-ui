import { AfterViewInit, Component, Input } from '@angular/core';
import { CoreEnums as CoreE, CoreInterfaces as CoreI, CoreIcons} from '@flexsuite/core';

@Component({
  selector: 'foundation-toast',
  template: ` <div
                id="notification-{{notification.id}}"
                class=" flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse
                        select-none cursor-pointer
                        opacity-0 transition-all duration-300
                        divide-x rtl:divide-x-reverse
                        rounded-md shadow divide-gray-700 space-x
                        ring-0 hover:ring-1 ring-slate-600 bg-gray-900
                        "
                (click)="destroyNotification()"
                role="alert">
                <foundation-icon
                  [icon]="getIcon()"
                />
                <div class="ps-4 text-sm font-normal">{{notification.description}}</div>
              </div>`,
})
export class ToastComponent implements AfterViewInit{
  @Input() notification: CoreI.INotification = {} as CoreI.INotification;

  types = CoreE.NotificationType

  DESTROY_NOTIFICATION_TIMEOUT = 5000 ; // 5 seconds
  ANIMATION_DURATION = 300 // 0.3 seconds
  $notification: HTMLElement | null = null;

  ngAfterViewInit(): void {
    this.$notification = document.getElementById(`notification-${this.notification.id}`);
    this.showNotification();
  }

  showNotification(){
    console.log(`Exibindo notificação ${this.notification.id}`, this.$notification)

    switch(this.notification.type){
      case CoreE.NotificationType.INFO:
        this.$notification?.classList.add('text-slate-500');
        break;
      case CoreE.NotificationType.SUCCESS:
        this.$notification?.classList.add('text-green-500');
        break;
      case CoreE.NotificationType.WARNING:
        this.$notification?.classList.add('text-yellow-500');
        break;
      case CoreE.NotificationType.ERROR:
        this.$notification?.classList.add('text-red-500');
        break;
    }

    if(!this.$notification) return;

    setTimeout(() => this.$notification?.classList.add('opacity-100'), this.ANIMATION_DURATION);
    setTimeout(() => this.destroyNotification(), this.DESTROY_NOTIFICATION_TIMEOUT);
  }

  destroyNotification(){
    console.log(`Destruindo notificação ${this.notification.id}`, this.$notification)

    if(!this.$notification) return;

    this.$notification.classList.remove('opacity-100');

    setTimeout(() => this.removeNotification(), this.ANIMATION_DURATION);
  }

  removeNotification(){
    console.log(`Removendo notificação ${this.notification.id}`, this.$notification)

    if(!this.$notification) return;
    this.$notification.remove();
  }

  getIcon(){
    switch(this.notification.type){
      default:
      case CoreE.NotificationType.INFO:
        return CoreIcons.NotificationInfoIcon;
      case CoreE.NotificationType.SUCCESS:
        return CoreIcons.NotificationSuccessIcon;
      case CoreE.NotificationType.WARNING:
        return CoreIcons.NotificationWarningIcon;
      case CoreE.NotificationType.ERROR:
        return CoreIcons.NotificationErrorIcon;
    }
  }
}
