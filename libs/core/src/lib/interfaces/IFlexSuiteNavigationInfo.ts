import { ModulePages, NavigationModules, NavigationPages } from "./IFlexSuiteNavigation";

export interface IFlexSuiteNavigationInfo {
  path: string;
  module?: NavigationModules;
  page?: NavigationPages;
  routes?: ModulePages;
}
