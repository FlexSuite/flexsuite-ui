import { LoaderService } from '@flexsuite/foundation/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private loader:LoaderService
  ){}


  ngOnInit(): void {
      this.loader.info('Carregando Sistema de autenticação...')

      setTimeout(() => {
        this.loader.hide();
      }, Math.random() * 1000);
  }

}
