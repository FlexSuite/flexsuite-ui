import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [HttpClientModule, CommonModule],
  providers: [],
  exports: [HomeComponent, LoginComponent],
})
export class CoreModule {}
