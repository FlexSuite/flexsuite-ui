import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components';
import { FlexSuiteNavigationService } from './services';

@NgModule({
  declarations: [
    IconComponent,
  ],
  imports: [HttpClientModule, CommonModule],
  providers: [
    FlexSuiteNavigationService
  ],
  exports: [
    IconComponent
  ],
})
export class FoundationModule {}
