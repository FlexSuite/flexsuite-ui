import { Component, OnInit } from '@angular/core';
import { CoreInterfaces } from '@flexsuite/core';
import { FlexSuiteNavigationService } from '../../services/navigation.service';

@Component({
  selector: 'foundation-breadcumb',
  templateUrl: './breadcumb.component.html',
})
export class BreadcumbComponent implements OnInit {
  breadcumb: CoreInterfaces.IBreadCumbRoad | undefined
  roads: CoreInterfaces.IBreadCumbRoad[] = []

  constructor(
    private navigation: FlexSuiteNavigationService
  ) {
    this.navigation.information.subscribe((info) => this.breadcumb = info.breadcumb)
  }

  ngOnInit(): void {
    this.makeRoads()
  }

  makeRoads() {
    this.roads = []
    let road: CoreInterfaces.IBreadCumbRoad | undefined = this.breadcumb

    while (road) {
      this.roads.push(road)
      road = road.children
    }
  }

  click(breadcumb: CoreInterfaces.IBreadCumbRoad | undefined){
    if(breadcumb?.route === undefined || breadcumb?.route === null) return
    this.navigation.navigate(breadcumb?.route)
  }

}
