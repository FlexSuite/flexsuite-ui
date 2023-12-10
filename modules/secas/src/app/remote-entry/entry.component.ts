import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'secas-secas-entry',
  template: `<secas-nx-welcome></secas-nx-welcome>`,
})
export class RemoteEntryComponent {}
