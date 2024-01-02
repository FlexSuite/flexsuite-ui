import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '@flexsuite/foundation';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'secas-provider',
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss',
})
export class ProviderComponent {
  constructor(
    private loader: LoaderService
  ) {
    this.loader.hide();
  }
}
