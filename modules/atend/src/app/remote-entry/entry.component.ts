import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'atend-atend-entry',
  template: `<atend-nx-welcome></atend-nx-welcome>`,
})
export class RemoteEntryComponent {}
