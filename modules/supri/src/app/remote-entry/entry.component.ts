import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'supri-supri-entry',
  template: `<supri-nx-welcome></supri-nx-welcome>`,
})
export class RemoteEntryComponent {}
