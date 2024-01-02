import { Component, Input } from '@angular/core';
import { FlexSuiteNavigationService } from '../../services/navigation.service';
import { CoreInterfaces } from '@flexsuite/core';

@Component({
  selector: 'foundation-page-title',
  template: `
    <h2 class="ms-1 text-3xl font-extrabold text-slate-800 mb-5 pointer-events-none">{{title}}</h2>
    <foundation-breadcumb *ngIf="!hideBreadcumb"/>
  `,
  styles: ``,
})
export class PageTitleComponent {
  @Input({}) hideBreadcumb = false
  title:CoreInterfaces.NavigationPages | undefined;

  constructor(
    private navigation: FlexSuiteNavigationService
  ){
    this.navigation.information.subscribe( info => this.title = info.page )
  }
}
