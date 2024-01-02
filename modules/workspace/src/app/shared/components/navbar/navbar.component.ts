import { Component } from '@angular/core';
import { FlexSuiteHideNavCompToRoute } from '@flexsuite/core/constants';
import { closeIcon, menuIcon } from '@flexsuite/core/icons';
import { IFlexSuiteNavigationInfo } from '@flexsuite/core/interfaces';
import { FlexSuiteNavigationService } from '@flexsuite/foundation';
@Component({
  selector: 'workspace-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navigationInfo: IFlexSuiteNavigationInfo | undefined
  menuIcon = menuIcon;
  closeIcon = closeIcon;

  constructor(
    private navigator: FlexSuiteNavigationService
  ){
    this.navigator.information.subscribe( info => this.navigationInfo = info )
  }

  navigateToHome(){
    this.navigator.navigate("/")
  }

  showNavbar(){
    if(!this.navigationInfo) return false

    return !FlexSuiteHideNavCompToRoute( this.navigationInfo )
  }
}
