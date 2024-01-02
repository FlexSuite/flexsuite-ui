import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoundationCommonModule, LoaderService } from '@flexsuite/foundation';

@Component({
  standalone: true,
  imports: [CommonModule, FoundationCommonModule],
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
