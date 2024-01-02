import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ProviderComponent } from '../core/provider/provider.component';
import { UsersComponent } from '../core/users/users.component';
import { FlexSuiteModuleRoutes } from '@flexsuite/core/constants';

const routes = FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso

export const remoteRoutes: Route[] = [
  { path: '', component: RemoteEntryComponent },
  { path: routes.Prestadores, component: ProviderComponent },
  { path: routes.Usuarios, component: UsersComponent}
];
