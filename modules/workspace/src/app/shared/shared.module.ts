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
import { FlexSuiteNavigationService, NotificationService } from '@flexsuite/foundation';

import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { FoundationModule } from '@flexsuite/foundation';

@NgModule({
  declarations: [
    SidebarComponent,

    //Navbar Components
    NavbarComponent,
    SearchComponent,
    AppsComponent,
    NotificationComponent,
    ProfileComponent,
    ItemComponent,
    LoaderComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    //Foundation components
    FoundationModule,
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

    //Foundation components
    FoundationModule,
  ],
})
export class SharedModule {}
