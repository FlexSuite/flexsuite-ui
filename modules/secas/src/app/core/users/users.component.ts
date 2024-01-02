import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '@flexsuite/foundation';

@Component({
  selector: 'secas-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(
    private loader: LoaderService
  ) {
    this.loader.hide()
  }
}
