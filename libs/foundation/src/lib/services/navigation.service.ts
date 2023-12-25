/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FlexSuiteModuleRoutes } from '@flexsuite/core/constants';
import { FlexSuiteModules } from '@flexsuite/core/enums';
import { IFlexSuiteNavigationInfo, ModulePages, NavigationPages } from '@flexsuite/core/interfaces';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class FlexSuiteNavigationService {
  private _currentPath: string | undefined;
  private _currentModule: FlexSuiteModules | undefined;
  private _currentPage: NavigationPages | undefined;
  private _currentRoutes: ModulePages | undefined;

  private _currentInfo: BehaviorSubject<IFlexSuiteNavigationInfo>;


  constructor(
    private router: Router,
    private loader: LoaderService
  ) {

    this._currentInfo = new BehaviorSubject<IFlexSuiteNavigationInfo>({
      path: '',
      module: undefined,
      page: undefined,
      routes: undefined,
    });


    this.router.events.subscribe((route) => {
      if(route instanceof NavigationEnd){
        this._currentPath = route.urlAfterRedirects.replace('/',''),

        this.getCurrentModuleAndPage();
        this.checkAndModifyTitle();
        this.updateInformation();
      }
    })
  }

  public get information() {
    return this._currentInfo.asObservable();
  }

  private updateInformation(){
    this._currentInfo.next({
      path: this._currentPath ?? '',
      module: this._currentModule,
      page: this._currentPage,
      routes: this._currentRoutes,
    })
  }

  private getCurrentModuleAndPage() {
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

  private checkAndModifyTitle(): void {
    if (!this._currentModule || !this._currentPage) return;
    const moduleKey = Object.keys(FlexSuiteModules).find((key: any) => {
      const moduleFound =
        FlexSuiteModules[key as keyof typeof FlexSuiteModules];
      if (moduleFound === this._currentModule) return true;
      return false;
    });

    document.title = `${moduleKey !== 'WORKS'? `[${moduleKey}] `: ''}${this._currentPage !== 'Home' ? `${this._currentPage} - ` : ''}FlexSuite ERP`
  }

  public navigate(path: string): void {
    this.loader.show();
    this.router.navigate([path]);
  }

}
