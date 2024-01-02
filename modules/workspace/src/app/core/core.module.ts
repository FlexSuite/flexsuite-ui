import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FoundationCommonModule, NotificationService } from '@flexsuite/foundation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, FoundationCommonModule],
  providers: [NotificationService],
  exports: [HomeComponent, LoginComponent],
})
export class CoreModule {}
