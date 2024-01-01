import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoaderService } from '@flexsuite/foundation/services';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'secas-secas-entry',
  template: `<secas-nx-welcome></secas-nx-welcome>`,
})
export class RemoteEntryComponent {
  constructor(
    private loader: LoaderService
  ) {
    setTimeout(()=>this.loader.hide(),2500)
  }
}
