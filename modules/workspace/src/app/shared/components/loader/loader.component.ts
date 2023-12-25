import { Component } from '@angular/core';
import { errorIcon } from '@flexsuite/core/icons';
import { LoaderService } from '@flexsuite/foundation/services';

@Component({
  selector: 'workspace-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  loading = true;
  hasError = false;
  errorIcon = errorIcon;

  transition = 250

  message = '';
  errorMessages: string[] = [];

  constructor(
    private loader: LoaderService,
  ) {
    loader.isLoading.subscribe((loading) => this.loading = loading)
    loader.message.subscribe((message) => this.message = message)
    loader.hasError.subscribe((hasError) => this.hasError = hasError)
    loader.errorMessages.subscribe((errorMessages) => this.errorMessages = errorMessages)
  }
}
