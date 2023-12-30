import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components';
import { FlexSuiteNavigationService } from './services';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [IconComponent, LoadingSpinnerComponent, NotificationComponent],
  imports: [HttpClientModule, CommonModule],
  providers: [FlexSuiteNavigationService],
  exports: [IconComponent, LoadingSpinnerComponent, NotificationComponent],
})
export class FoundationModule {}
