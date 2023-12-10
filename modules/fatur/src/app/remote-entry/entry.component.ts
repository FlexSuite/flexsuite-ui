import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'fatur-fatur-entry',
  template: `<fatur-nx-welcome></fatur-nx-welcome>`,
})
export class RemoteEntryComponent {}
