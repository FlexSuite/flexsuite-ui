import { FlexSuiteNavigationService, LoaderService, NotificationService } from '@flexsuite/foundation/services';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'workspace-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
    remember: false,
  }

  constructor(
    private loader:LoaderService,
    private notification: NotificationService,
    private navigation: FlexSuiteNavigationService
  ){}


  ngOnInit(): void {
      this.loader.info('Carregando Sistema de autenticação...')
      this.loader.hide();

      setTimeout(() => {
      }, Math.random() * 1000);
  }

  onSubmit(formData: NgForm) {
    const {
      username,
      password,
      remember,
    } = formData.value;

    if(formData.controls['username'].invalid) {
      this.notification.error({description: 'Usuário inválido!'});
      this.notification.send("Acesse com nome.sobrenome no usuário")
      return;
    }

    this.loader.show('Autenticando...');


    if (username === 'flex.suite' && password === 'admin') {
      setTimeout(()=>{
        this.loader.hide();
        this.navigation.navigate('');
      }, Math.random() * 2500);
    } else {
      this.notification.error({description: 'Usuário ou senha inválidos!'});
    }


  }
}
