import { Component, OnInit } from '@angular/core';
import { AppMenu } from '@flexsuite/core/constants';
import { FlexSuiteIcons, appIcon } from '@flexsuite/core/icons';

@Component({
  selector: 'workspace-navbar-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent implements OnInit{
  modules = AppMenu.sort((a,b) => a.label.localeCompare(b.label))
  icon = appIcon

  ngOnInit(): void {
    console.log(this.modules)
    console.log(FlexSuiteIcons.getModuleIcon(this.modules[0]?.label))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adjustLabel(label: string): string {
    return label.split("_")[0]
    .replace("Relatorios","Relatórios")
    .replace("Seguranca","Segurança")
    .replace("Producao","Produção")
    .replace("Logistica","Logística")
  }
}
