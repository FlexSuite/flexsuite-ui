import { Component } from '@angular/core';

@Component({
  selector: 'workspace-navbar-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user = {
    name: 'Lucas Mendes',
    email: 'lucas@endems.com.br',
    photo: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png'
  }
}
