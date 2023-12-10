import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'produ-produ-entry',
  template: `<produ-nx-welcome></produ-nx-welcome>`,
})
export class RemoteEntryComponent {}
