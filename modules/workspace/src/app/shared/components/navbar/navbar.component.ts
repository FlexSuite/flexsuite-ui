import { Component } from '@angular/core';
import { closeIcon, menuIcon } from '@flexsuite/core/icons';
import { FlexSuiteNavigationService } from '@flexsuite/foundation/services';
@Component({
  selector: 'workspace-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuIcon = menuIcon;
  closeIcon = closeIcon;

  constructor(
    private navigator: FlexSuiteNavigationService
  ){

  }

  navigateToHome(){
    this.navigator.navigate("/")
  }
}
