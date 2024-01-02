import { Route } from '@angular/router';
import { ProviderComponent } from '../core/provider/provider.component';
import { UsersComponent } from '../core/users/users.component';
import { FlexSuiteModuleRoutes } from '@flexsuite/core/constants';
import { HomeComponent } from '../core/home/home.component';

const routes = FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso

export const remoteRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: routes.Prestadores, component: ProviderComponent },
  { path: routes.Usuarios, component: UsersComponent}
];
