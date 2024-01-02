import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './icon/icon.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastComponent } from './notification/toast.component';
import { NotificationComponent } from './notification/notification.component';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ActionControllerComponent } from './action-controller/action-controller.component';

@NgModule({
  declarations: [
    IconComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    NotificationComponent,
    BreadcumbComponent,
    PageTitleComponent,
    ActionControllerComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    IconComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    NotificationComponent,
    BreadcumbComponent,
    PageTitleComponent,
    ActionControllerComponent,
  ],
})
export class FoundationCommonModule {}
