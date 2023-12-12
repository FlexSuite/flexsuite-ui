import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/navbar/components/search/search.component';
import { AppsComponent } from './components/navbar/components/apps/apps.component';
import { NotificationComponent } from './components/navbar/components/notification/notification.component';
import { ProfileComponent } from './components/navbar/components/profile/profile.component';
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
  ],
  imports: [HttpClientModule, CommonModule, FoundationModule],
  providers: [],
  exports: [NavbarComponent, SidebarComponent, SearchComponent],
})
export class SharedModule {}
