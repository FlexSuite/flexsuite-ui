import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from './icon/icon.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastComponent } from './notification/toast.component';
import { NotificationComponent } from './notification/notification.component';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ActionControllerComponent } from './action-controller/action-controller.component';
import { ActionButtonComponent } from './buttons/action-button.component';

@NgModule({
  declarations: [
    IconComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    NotificationComponent,
    BreadcumbComponent,
    PageTitleComponent,
    ActionControllerComponent,
    ActionButtonComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    IconComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    NotificationComponent,
    BreadcumbComponent,
    PageTitleComponent,
    ActionControllerComponent,
    ActionButtonComponent,
  ],
})
export class FoundationCommonModule {}
