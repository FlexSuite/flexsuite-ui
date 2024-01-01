import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationCommonModule } from './components/foundation-common.module';



@NgModule({
  declarations: [

  ],
  providers: [

  ],
  imports: [
    CommonModule,
    FoundationCommonModule,
  ],
  exports: [
    FoundationCommonModule,
  ]
})
export class FoundationModule { }
