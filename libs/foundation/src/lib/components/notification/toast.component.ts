import { Component, Input } from '@angular/core';
import { enums  as CoreE, interfaces as CoreI} from '@flexsuite/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  imports: [ IconComponent ],
  selector: 'foundation-toast',
  template: ` <div
                id="notification-{{notification.id}}"
                class=" flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse
                        select-none  pointer-events-none transition-all duration-300
                        divide-x rtl:divide-x-reverse
                        rounded-lg shadow text-gray-400 divide-gray-700 space-x bg-gray-800" role="alert">
                <foundation-icon [icon]="icons.INFO" forcedClass="fill-slate-500"/>
                <div class="ps-4 text-sm font-normal">{{notification.description}}</div>
              </div>`,
})
export class ToastComponent {
  @Input() notification: CoreI.INotification = {} as CoreI.INotification;
  icons = CoreE.NotificationIcon;
}
