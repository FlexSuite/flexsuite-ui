/**
 * FlexSuiteIcons
 *
 * Obter icones para os modulos e telas
 */

import {
  FlexSuiteCommonPages,
  FlexSuiteFaturPages,
  FlexSuiteModules,
  FlexSuiteSecasPages,
} from '../enums/FlexSuiteNavigation';
import {
  matWorkspaces,
  matSecurity,
  matMonetizationOn,
  matBalance,
  matFactory,
  matHome,
  matSupervisedUserCircle,
} from '@ng-icons/material-icons/baseline';

import {
  remixCustomerService2Line,
  remixBox1Fill,
  remixProfileFill,
} from '@ng-icons/remixicon';

import {
  ionSettingsSharp
} from '@ng-icons/ionicons';

import {
  faSolidMoneyBillTransfer,
  faSolidFileInvoiceDollar
} from '@ng-icons/font-awesome/solid';
import { analyIcon, logisIcon, rehumIcon } from './ModulesIcons';

function getModuleIcon(module: FlexSuiteModules) {
  return FlexSuiteModuleIcons[module];
}

function getPageIcon(module: FlexSuiteModules, page: unknown) {
  return FlexSuitePageIcons[module][
    page as FlexSuiteCommonPages | FlexSuiteSecasPages | FlexSuiteFaturPages
  ];
}

export const FlexSuiteIcons = {
  getModuleIcon,
  getPageIcon,
};

export const FlexSuiteModuleIcons = {
  [FlexSuiteModules.WORKS]: matWorkspaces,
  [FlexSuiteModules.SECAS]: matSecurity,
  [FlexSuiteModules.FATUR]: matMonetizationOn,
  [FlexSuiteModules.ANALY]: analyIcon,
  [FlexSuiteModules.CONTI]: matBalance,
  [FlexSuiteModules.LOGIS]: logisIcon,
  [FlexSuiteModules.PRODU]: matFactory,
  [FlexSuiteModules.REHUM]: rehumIcon,
  [FlexSuiteModules.ATEND]: remixCustomerService2Line,
  [FlexSuiteModules.SUPRI]: remixBox1Fill,
};

const FlexSuitePageIcons: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in FlexSuiteModules]: any;
} = {
  [FlexSuiteModules.WORKS]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.SECAS]: {
    [FlexSuiteCommonPages.HOME]: matHome,
    [FlexSuiteSecasPages.USUARIOS]: matSupervisedUserCircle,
    [FlexSuiteSecasPages.PRESTADORES]: remixProfileFill,
    [FlexSuiteSecasPages.CONFIGURACOES]: ionSettingsSharp,
  },
  [FlexSuiteModules.FATUR]: {
    [FlexSuiteCommonPages.HOME]: matHome,
    [FlexSuiteFaturPages.COBRANCAS]: faSolidMoneyBillTransfer,
    [FlexSuiteFaturPages.FATURAS]: faSolidFileInvoiceDollar,
    [FlexSuiteFaturPages.CONFIGURACOES]: ionSettingsSharp,
  },
  [FlexSuiteModules.ANALY]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.CONTI]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.LOGIS]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.PRODU]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.REHUM]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.ATEND]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
  [FlexSuiteModules.SUPRI]: {
    [FlexSuiteCommonPages.HOME]: matHome,
  },
};
