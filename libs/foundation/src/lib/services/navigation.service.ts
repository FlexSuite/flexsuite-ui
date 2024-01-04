/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';
import { CoreInterfaces as CoreI, CoreEnums as CoreE, CoreConstants as CoreC } from '@flexsuite/core';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root',
})
export class FlexSuiteNavigationService {
  private _currentPath: string | undefined;
  private _currentModule: CoreE.FlexSuiteModules | undefined;
  private _currentPage: CoreI.NavigationPages | undefined;
  private _currentRoutes: CoreI.ModulePages | undefined;
  private _currentModuleKey: keyof typeof CoreE.FlexSuiteModules | undefined;

  private _currentInfo: BehaviorSubject<CoreI.IFlexSuiteNavigationInfo>;


  constructor(
    private router: Router,
    private loader: LoaderService,
    private notification: NotificationService
  ) {
    this._currentInfo = new BehaviorSubject<CoreI.IFlexSuiteNavigationInfo>({
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
        this.generateBreadcumb();
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
      moduleKey: this._currentModuleKey,
      page: this._currentPage,
      routes: this._currentRoutes,
      breadcumb: this.generateBreadcumb()
    })
  }

  private getCurrentModuleAndPage() {
    if(this._currentPath === undefined || this._currentPath === null) return;
    //Primeiro verifica se tem / na rota
    let tempModuleRoute: any
    let tempModulePageRoute: any

    if(this._currentPath.includes('/')){
      //Se tiver, pega o primeiro elemento
      tempModuleRoute = this._currentPath.split('/')[0];
      tempModulePageRoute = this._currentPath.split('/')[1];
    }else{
      tempModuleRoute = this._currentPath;
    }

    Object.entries(CoreC.FlexSuiteModuleRoutes).forEach(([module, pages]) => {
      if(pages?.Home === tempModuleRoute){
        this._currentRoutes = pages;
        this._currentModule = module as CoreE.FlexSuiteModules;

        Object.keys(CoreE.FlexSuiteModules).forEach((key) => {
          if (CoreE.FlexSuiteModules[key as keyof typeof CoreE.FlexSuiteModules] === this._currentModule) {
            this._currentModuleKey = key as  keyof typeof CoreE.FlexSuiteModules;
            return;
          }
        });

        if(tempModulePageRoute && pages){
          Object.entries(pages).forEach(([page, route]) => {
            if(route === tempModulePageRoute){
              this._currentPage = page as CoreI.NavigationPages;
              return;
            }
          })
        }else{
          this._currentPage = CoreE.FlexSuiteCommonPages.HOME;
        }
      }
    })

    if(!this._currentModule && !this._currentPage){
      Object.entries(CoreC.FlexSuiteModuleRoutes).forEach(([module, pages]) => {
        Object.entries(pages).forEach(([page, route]) => {
          if(route === tempModuleRoute){
            this._currentModule = module as CoreE.FlexSuiteModules;
            this._currentPage = page as CoreI.NavigationPages;
            this._currentRoutes = pages;
            return;
          }
        })
      })
    }
  }

  private checkAndModifyTitle(): void {
    if (!this._currentModule || !this._currentPage) return;
    const moduleKey = Object.keys(CoreE.FlexSuiteModules).find((key: any) => {
      const moduleFound =
        CoreE.FlexSuiteModules[key as keyof typeof CoreE.FlexSuiteModules];
      if (moduleFound === this._currentModule) return true;
      return false;
    });

    document.title = `${moduleKey !== 'WORKS'? `[${moduleKey}] `: ''}${this._currentPage !== 'Home' ? `${this._currentPage} - ` : ''}FlexSuite ERP`
  }

  public navigate(path: string): void {
    if(this.isOnTheSamePath(path)) {
      this.notification.send('Você já está nessa página');
      return;
    };

    this.loader.show();
    setTimeout(() => {
      //Aguarda aparição do loading
      this.router.navigate([path]);
    },250)
  }

  private generateBreadcumb(){
    if(!this._currentModule || !this._currentPage || !this._currentModuleKey) return;

    const fatherBreadCumb: CoreI.IBreadCumbRoad = {
      title: 'Inicio',
      route: CoreC.FlexSuiteModuleRoutes.Workspace.Home,
    }

    const moduleBreadCumb: CoreI.IBreadCumbRoad | undefined = this._currentModule != CoreE.FlexSuiteModules.WORKS ?
                        {
                          title: (CoreE.FlexSuiteModules[this._currentModuleKey] as any)?.replaceAll('_',' '),
                          route: CoreC.FlexSuiteModuleRoutes[this._currentModule]?.Home
                        } : undefined;

    const pageBradcumb: CoreI.IBreadCumbRoad | undefined  = this._currentPage != CoreE.FlexSuiteCommonPages.HOME ?
                        {
                          title: this._currentPage,
                          route: CoreC.FlexSuiteModuleRoutes[this._currentModule]?.[this._currentPage]
                        } : undefined;

    fatherBreadCumb.children = moduleBreadCumb;

    if(moduleBreadCumb)
      moduleBreadCumb.children = pageBradcumb;

    return fatherBreadCumb;
  }

  isOnTheSamePath(path: string): boolean {
    return this._currentPath === path;
  }

}
