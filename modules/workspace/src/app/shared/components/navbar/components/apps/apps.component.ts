import { Component } from '@angular/core';
import { AppMenu } from '@flexsuite/core/constants';
import { appIcon } from '@flexsuite/core/icons';

@Component({
  selector: 'workspace-navbar-apps',
  templateUrl: './apps.component.html',
})
export class AppsComponent{
  modules = AppMenu.sort((a,b) => a.label.localeCompare(b.label))
  icon = appIcon
  
  adjustLabel(label: string): string {
    return label.split("_")[0]
    .replace("Relatorios","Relatórios")
    .replace("Seguranca","Segurança")
    .replace("Producao","Produção")
    .replace("Logistica","Logística")
  }
}
