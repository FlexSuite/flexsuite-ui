import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './icon/icon.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ToastComponent } from './notification/toast.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    IconComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    IconComponent,
    LoadingSpinnerComponent,
    ToastComponent,
    NotificationComponent,
  ],
})
export class FoundationCommonModule { }
