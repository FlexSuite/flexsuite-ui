import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/navbar/components/search/search.component';
import { AppsComponent } from './components/navbar/components/apps/apps.component';
import { NotificationComponent } from './components/navbar/components/notification/notification.component';
import { ProfileComponent } from './components/navbar/components/profile/profile.component';
import { ItemComponent } from './components/sidebar/components/item/item.component';
import { FlexSuiteNavigationService, NotificationService } from '@flexsuite/foundation/services';

import {
  IconComponent,
  LoadingSpinnerComponent,
  NotificationComponent as FoundationNotificationComponent
} from '@flexsuite/foundation/components';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    SidebarComponent,

    //Navbar Components
    NavbarComponent,
    SearchComponent,
    AppsComponent,
    NotificationComponent,
    ProfileComponent,
    IconComponent,
    ItemComponent,

    //Foundation components
    LoadingSpinnerComponent,
    LoaderComponent,
    FoundationNotificationComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    FlexSuiteNavigationService,
    NotificationService
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SearchComponent,
    ItemComponent,
    LoaderComponent,
    FoundationNotificationComponent
  ],
})
export class SharedModule {}
