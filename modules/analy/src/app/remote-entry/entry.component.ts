import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'analy-analy-entry',
  template: `<analy-nx-welcome></analy-nx-welcome>`,
})
export class RemoteEntryComponent {}
