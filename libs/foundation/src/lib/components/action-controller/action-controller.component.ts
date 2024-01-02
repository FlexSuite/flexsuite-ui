import { Component } from '@angular/core';
import { CoreIcons } from '@flexsuite/core';

@Component({
  selector: 'foundation-action-controller',
  templateUrl: './action-controller.component.html',
  styleUrl: './action-controller.component.scss',
})
export class ActionControllerComponent {
  saveIconSolid = CoreIcons.saveIconSolid
  searchIcon = CoreIcons.searchIcon
  refreshIcon = CoreIcons.refreshIcon
  addIcon = CoreIcons.addIcon

  searchText: string = ''

  onSearchBtnClick(){
    console.log('Search button clicked',this.searchText)
  }

  onSearchEnterKey(event: KeyboardEvent){
    if(event.key === 'Enter'){
      console.log('Search enter key pressed',this.searchText)
    }
  }
}
