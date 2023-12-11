import { Route } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { FlexSuiteModuleRoutes } from '@flexsuite/core/constants';
/**
 * Rotas do FlexSuite
 * Não alterar estrutura das rotas federadas
 */
export const appRoutes: Route[] = [

  /**
   * Rotas federadas
   */

  { path: FlexSuiteModuleRoutes.Suprimentos.Home, loadChildren: () => import('supri/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Atendimento.Home, loadChildren: () => import('atend/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Recursos_Humanos.Home, loadChildren: () => import('rehum/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Producao.Home, loadChildren: () => import('produ/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Logistica.Home, loadChildren: () => import('logis/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Contabilidade.Home, loadChildren: () => import('conti/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Analytics_e_Relatorios.Home, loadChildren: () => import('analy/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Faturamento.Home, loadChildren: () => import('fatur/Routes').then((m) => m.remoteRoutes),},
  { path: FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso.Home, loadChildren: () => import('secas/Routes').then((m) => m.remoteRoutes),},

  /**
   * Rotas do Workspace
   */
  {
    path: '',
    component: HomeComponent,
  }
];
