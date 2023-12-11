import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { initFlowbite } from 'flowbite';

@Component({
  standalone: true,
  imports: [RouterModule,CoreModule,SharedModule],
  selector: 'workspace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'workspace';

  ngOnInit(){
    initFlowbite();
  }
}
