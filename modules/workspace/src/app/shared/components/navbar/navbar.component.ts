import { Component } from '@angular/core';
import { closeIcon, menuIcon } from '@flexsuite/core/icons';
@Component({
  selector: 'workspace-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuIcon = menuIcon;
  closeIcon = closeIcon;
}
