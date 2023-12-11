import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  providers: [
  ],
  exports:[
    HomeComponent
  ]
})
export class CoreModule { }
