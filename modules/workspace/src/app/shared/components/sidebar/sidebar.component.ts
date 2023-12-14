import { Component, OnInit } from '@angular/core';
import { FlexSuiteSidebarItems } from '@flexsuite/core/constants';
import { FlexSuiteModules } from '@flexsuite/core/enums';
import { simpleSettingsIcon, worldIcon } from '@flexsuite/core/icons';
import { IFlexSuiteNavigationInfo, ISidebarItem } from '@flexsuite/core/interfaces';
import { FlexSuiteNavigationService } from '@flexsuite/foundation/services';
import { Dropdown, DropdownInterface, DropdownOptions, Tooltip, TooltipInterface, TooltipOptions } from 'flowbite';

@Component({
  selector: 'workspace-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit{
  navInfo: IFlexSuiteNavigationInfo | undefined = undefined
  items: ISidebarItem[] = []
  simpleSettingsIcon = simpleSettingsIcon
  worldIcon = worldIcon

  languageTooltip:TooltipInterface | undefined;
  languageDropdown:DropdownInterface | undefined;

  constructor(
    private navigation: FlexSuiteNavigationService,
  ) {
  }

  ngOnInit(): void {
    this.navigation.information.subscribe((info) => {
      console.log('sobrescreveu', info)
      this.navInfo = info
      this.items = FlexSuiteSidebarItems[info.module ?? FlexSuiteModules.WORKS]
    })

    this.checkLanguageObjects()
  }

  checkLanguageObjects() {
    const $target = document.getElementById("language-menu")
    const $tooltip = document.getElementById("language-tooltip")
    const $dropdown = document.getElementById("language-dropdown")

    const tooltipOptions: TooltipOptions = {
      placement: 'top',
      triggerType: 'hover',
      onShow: () => {
        if(this.languageDropdown?.isVisible()) {
          this.languageTooltip?.hide()
        }
      },
    }

    const dropdownOptions: DropdownOptions = {
      triggerType: 'click',
      placement: 'top',
      ignoreClickOutsideClass: false,
      offsetDistance: 10,
      offsetSkidding: 0,
      delay: 300,
      onToggle: () => {
        this.languageTooltip?.hide()
      }
    }

    const dropdownInstance = {
      id: 'languageDropdown',
      override: true
    };

    const tooltipInstance = {
      id: 'languageTooltip',
      override: true
    };


    this.languageTooltip = new Tooltip($tooltip, $target, tooltipOptions, tooltipInstance)
    this.languageDropdown = new Dropdown($dropdown, $target, dropdownOptions, dropdownInstance)
  }

}
