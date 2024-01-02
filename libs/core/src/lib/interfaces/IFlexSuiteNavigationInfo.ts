import { FlexSuiteModules } from "../enums";
import { IBreadCumbRoad } from "./IBreadCumb";
import { ModulePages, NavigationModules, NavigationPages } from "./IFlexSuiteNavigation";

export interface IFlexSuiteNavigationInfo {
  path: string;
  module?: NavigationModules;
  moduleKey?: keyof typeof FlexSuiteModules;
  page?: NavigationPages;
  routes?: ModulePages;
  breadcumb?: IBreadCumbRoad;
}
