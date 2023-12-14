import { Component } from '@angular/core';
import { AppMenu } from '@flexsuite/core/constants';
import { appIcon } from '@flexsuite/core/icons';
import { IAppItem } from '@flexsuite/core/interfaces';
import { FlexSuiteNavigationService } from '@flexsuite/foundation/services';
@Component({
  selector: 'workspace-navbar-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent{
  modules = AppMenu.sort((a,b) => a.label.localeCompare(b.label))
  icon = appIcon

  constructor(
    private navigator: FlexSuiteNavigationService
  ){

  }

  navigate(module: IAppItem){
    if(!module.path) return console.error("Module without path")
    this.navigator.navigate(module.path)
  }

  adjustLabel(label: string): string {
    return label.split("_")[0]
    .replace("Relatorios","Relatórios")
    .replace("Seguranca","Segurança")
    .replace("Producao","Produção")
    .replace("Logistica","Logística")
  }
}
