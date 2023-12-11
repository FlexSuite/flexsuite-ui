import { Component, Input } from '@angular/core';

@Component({
  selector: 'workspace-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input({required: false})
  mobile = false

  @Input({required: false})
  sidebar= false

  constructor() {

  }

  getNavbarClass(){
    return !this.mobile ? `hidden md:block md:pl-2 dark ms-20 w-full`: `mt-5 md:hidden w-full ${!this.sidebar ?' dark md:pl-2  ms-20' : 'me-20'}`
  }
}
