import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components';

@NgModule({
  declarations: [
    IconComponent,
  ],
  imports: [HttpClientModule, CommonModule],
  providers: [],
  exports: [
    IconComponent
  ],
})
export class FoundationModule {}
