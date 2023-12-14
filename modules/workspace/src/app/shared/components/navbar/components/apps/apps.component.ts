import { Component, OnInit } from '@angular/core';
import { AppMenu } from '@flexsuite/core/constants';
import { appIcon } from '@flexsuite/core/icons';
import { IAppItem } from '@flexsuite/core/interfaces';
import { FlexSuiteNavigationService } from '@flexsuite/foundation/services';
import { Dropdown, DropdownInterface, DropdownOptions } from 'flowbite';
@Component({
  selector: 'workspace-navbar-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit{
  dropdown: DropdownInterface | undefined
  modules = AppMenu.sort((a,b) => a.label.localeCompare(b.label))
  icon = appIcon

  constructor(
    private navigator: FlexSuiteNavigationService
  ){

  }

  ngOnInit(): void {
    const $dropdown = document.getElementById('modules-dropdown')
    const $toggle = document.getElementById('modules-dropdown-toggle')

    const configurations: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      ignoreClickOutsideClass: false,
    }

    const instanceOptions = {
      id: 'moduleDropdown',
      override: true
    };

    this.dropdown = new Dropdown($dropdown, $toggle, configurations, instanceOptions);
    this.dropdown?.init()
  }

  showDropdown(){
    this.dropdown?.show()
  }

  navigate(module: IAppItem){
    if(!module.path) return console.error("Module without path")
    this.navigator.navigate(module.path)

    this.dropdown?.toggle()
  }

  adjustLabel(label: string): string {
    return label.split("_")[0]
    .replace("Relatorios","Relatórios")
    .replace("Seguranca","Segurança")
    .replace("Producao","Produção")
    .replace("Logistica","Logística")
  }
}
