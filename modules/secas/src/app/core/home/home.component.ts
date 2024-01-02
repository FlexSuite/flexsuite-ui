import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationCommonModule, LoaderService } from '@flexsuite/foundation';

@Component({
  selector: 'secas-home',
  standalone: true,
  imports: [CommonModule, FoundationCommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
