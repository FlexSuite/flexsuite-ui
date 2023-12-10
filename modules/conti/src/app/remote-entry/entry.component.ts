import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'conti-conti-entry',
  template: `<conti-nx-welcome></conti-nx-welcome>`,
})
export class RemoteEntryComponent {}
