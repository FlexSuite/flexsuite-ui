import { Component, Input, OnChanges } from '@angular/core';
import { ISidebarItem } from '@flexsuite/core/interfaces';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'workspace-sidebar-item',
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnChanges {
  @Input()
  isAChild = false

  @Input({required: true})
  item: ISidebarItem = {
    id: 0,
    label: '',
    icon: '',
    path: '',
    children: [],
  }

  btnId = ''
  dropdownId: string | undefined = undefined

  constructor() {

  }

  ngOnChanges(): void {
    initFlowbite()
    this.btnId = `btn-${this.item.label.replace(" ", "-").toLowerCase()}-${this.item.id}`
    this.dropdownId = this?.item.children ? `dropdown-${this.item.label.replace(" ", "-").toLowerCase()}-${this.item.id}` : undefined
  }



  hasChildren(): boolean {
    return (this.item?.children ?? false) && ((this.item?.children?.length ?? 0) > 0);
  }

  onclick(): void {
    if(!this.item.children || (this.isAChild && !this.item.children)){
      //To-DO: Navigate to path
      console.log(`Clicked on ${this.item.label}`)
    }
  }

}
