import { FlexSuiteModules } from "../enums/FlexSuiteNavigation";

export interface IAppItem{
    id: number;
    label: FlexSuiteModules;
    path?: string;
    icon?: string;
}
