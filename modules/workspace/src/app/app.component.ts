import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { initFlowbite } from 'flowbite';
import { FlexSuiteNavigationService, LoaderService } from '@flexsuite/foundation';
import { IFlexSuiteNavigationInfo } from '@flexsuite/core/interfaces';
import { FlexSuiteHideNavCompToRoute } from '@flexsuite/core/constants';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule,CoreModule,SharedModule,CommonModule],
  selector: 'workspace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'workspace';
  navigationInfo: IFlexSuiteNavigationInfo | undefined = undefined
  constructor(
    private loader: LoaderService,
    private navigation: FlexSuiteNavigationService
  ){
  }

  ngOnInit(){
    initFlowbite();
    this.loader.show();
    this.navigation.information.subscribe((info) => this.navigationInfo = info)
  }

  showPadding(){
    if(!this.navigationInfo) return false

    return !FlexSuiteHideNavCompToRoute( this.navigationInfo )
  }
}
