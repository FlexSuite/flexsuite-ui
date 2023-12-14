import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'foundation-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
