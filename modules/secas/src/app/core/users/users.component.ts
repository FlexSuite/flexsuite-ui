import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationCommonModule, LoaderService } from '@flexsuite/foundation';
import { UserForm } from './form/UserForm';
// import { ITable } from '@flexsuite/core/interfaces';

@Component({
  selector: 'secas-users',
  standalone: true,
  imports: [CommonModule, FoundationCommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit{
  form = new UserForm(this.loader);

  constructor(
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.hide()
  }

}
