import { FlexSuiteCommonPages, FlexSuiteFaturPages, FlexSuiteModules, FlexSuiteSecasPages, FlexSuiteWorksPages } from "../enums/FlexSuiteNavigation";
import { IFlexSuiteNavigationInfo } from "../interfaces";
import { ModuleRoutes, NavigationPages } from "../interfaces/IFlexSuiteNavigation";

export const FlexSuiteModuleRoutes: ModuleRoutes = {
    [FlexSuiteModules.WORKS]: {
        [FlexSuiteCommonPages.HOME]: '',
        [FlexSuiteWorksPages.LOGIN]: 'auth',
    },
    [FlexSuiteModules.FATUR]: {
        [FlexSuiteCommonPages.HOME]: 'revenue',
        [FlexSuiteFaturPages.COBRANCAS]: 'billing',
        [FlexSuiteFaturPages.FATURAS]: 'invoices',
        [FlexSuiteFaturPages.CONFIGURACOES]: 'settings',
    },
    [FlexSuiteModules.SECAS]: {
        [FlexSuiteCommonPages.HOME]: 'security',
        [FlexSuiteSecasPages.PRESTADORES]: 'providers',
        [FlexSuiteSecasPages.USUARIOS]: 'users',
        [FlexSuiteSecasPages.CONFIGURACOES]: 'settings',
    },
    [FlexSuiteModules.ANALY]: {
        [FlexSuiteCommonPages.HOME]: 'analytics',
    },
    [FlexSuiteModules.CONTI]: {
        [FlexSuiteCommonPages.HOME]: 'accounting',
    },
    [FlexSuiteModules.LOGIS]: {
        [FlexSuiteCommonPages.HOME]: 'logistics',
    },
    [FlexSuiteModules.PRODU]: {
        [FlexSuiteCommonPages.HOME]: 'production',
    },
    [FlexSuiteModules.REHUM]: {
        [FlexSuiteCommonPages.HOME]: 'resources',
    },
    [FlexSuiteModules.ATEND]: {
        [FlexSuiteCommonPages.HOME]: 'attendance',
    },
    [FlexSuiteModules.SUPRI]: {
        [FlexSuiteCommonPages.HOME]: 'supplies',
    },
}


const FlexSuiteHideNavComponentsToRoute: {
  module: FlexSuiteModules,
  pages: NavigationPages[]
}[] = [
  {
    module: FlexSuiteModules.WORKS,
    pages: [
      FlexSuiteWorksPages.LOGIN
    ]
  }
]

export const FlexSuiteHideNavCompToRoute = ( { module , page } : IFlexSuiteNavigationInfo): boolean => {
  const moduleRoutes = FlexSuiteHideNavComponentsToRoute.find(m => m.module === module)
  if (moduleRoutes && page) {
    return moduleRoutes.pages.includes(page)
  }
  return false
}
