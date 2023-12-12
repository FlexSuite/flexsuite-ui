/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { FlexSuiteModuleRoutes } from '@flexsuite/core/constants';
import { FlexSuiteCommonPages, FlexSuiteModules } from '@flexsuite/core/enums';
import { NavigationPages } from '@flexsuite/core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FlexSuiteNavigationService {
  private _currentPath = '';
  private _currentModule: FlexSuiteModules = FlexSuiteModules.WORKS;
  private _currentPage: NavigationPages = FlexSuiteCommonPages.HOME;
  private _currentRoutes: { [key: string]: string } = {};

  constructor() {
    this._currentPath = window.location.pathname.replace('/', '');
    this.getCurrentModuleAndPage();
    this.checkAndModifyTitle();
  }

  getCurrentPath(): string {
    return this._currentPath;
  }

  getCurrentModuleAndPage() {
    Object.entries(FlexSuiteModuleRoutes).forEach(([module, pages]) => {
      if (!pages) return;
      // Iterando sobre as páginas do módulo
      Object.keys(pages).forEach((page) => {
        if ((pages as string)[page as any] === this._currentPath) {
          this._currentModule = module as FlexSuiteModules;
          this._currentPage = page as NavigationPages;

          Object.entries(FlexSuiteModuleRoutes).forEach(([mod, pages]) => {
            if (mod === module) {
              this._currentRoutes = pages;
              return;
            }
          });
        }
      });
    });
  }

  checkAndModifyTitle(): void {
    if (!this._currentModule || !this._currentPage) return;
    const moduleKey = Object.keys(FlexSuiteModules).find((key: any) => {
      const moduleFound =
        FlexSuiteModules[key as keyof typeof FlexSuiteModules];
      if (moduleFound === this._currentModule) return true;
      return false;
    });

    document.title = `${moduleKey !== 'WORKS'? `[${moduleKey}] `: ''}${this._currentPage !== 'Home' ? `${this._currentPage} - ` : ''}FlexSuite ERP`
  }
}
