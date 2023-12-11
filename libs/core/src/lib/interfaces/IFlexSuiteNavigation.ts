import { FlexSuiteCommonPages, FlexSuiteFaturPages, FlexSuiteModules, FlexSuiteSecasPages } from "../enums/FlexSuiteNavigation"

interface IFlexSuiteNavigationModule{
    name: string
    path: string
    icon?: unknown
    pages:  {
        [key in string]: IFlexSuiteNavigationPage
    }
}

interface IFlexSuiteNavigationPage {
    name: string
    path: string
    icon?: unknown
}

export type IFlexSuiteNavigation = {
    [key in FlexSuiteModules]: IFlexSuiteNavigationModule
}

export type IFlexSuiteNavigationContext = {
    module: NavigationModules | undefined,
    page: NavigationPages | undefined,
    routes: ModuleRoutes | undefined,
    allRoutes: ModuleRoutes | undefined
    navigateTo: (path: string | undefined) => void
}

export type ModuleRoutes = {
  [module in NavigationModules]: ModulePages
}

export type ModulePages = {
  [page in NavigationPages]?: string
}

export type NavigationPages = (

      FlexSuiteCommonPages |
      FlexSuiteFaturPages |
      FlexSuiteSecasPages
  )


export type NavigationModules = FlexSuiteModules
