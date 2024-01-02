import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '@flexsuite/foundation';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'secas-secas-entry',
  template: `<div>Secas Module</div>`,
})
export class RemoteEntryComponent{
  loading = false
  constructor(
    private loader: LoaderService
  ) {
    this.loader.isLoading.subscribe((loading) => {
      this.loading = loading
    })

    this.loader.show()

    setTimeout(()=>{
      this.loader.hide()
    },1500)
  }
}
