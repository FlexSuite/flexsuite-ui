import { FlexSuiteNavigationService, LoaderService, NotificationService } from '@flexsuite/foundation';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreUtils } from '@flexsuite/core';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      remember,
    } = formData.value;

    this.loader.show('Autenticando...');

    if (username === 'flex.suite' && password === 'admin') {
      setTimeout(()=>{
        this.loader.hide();
        this.navigation.navigate('');
      }, Math.random() * 2500);
    } else {
      const validateUserName = CoreUtils.validateUsername(username)
      const validatePassword = CoreUtils.validatePassword(password)
      const hasError = !validatePassword.valid || !validateUserName.valid;

      if(!validateUserName.valid)
        this.notification.alert({description: validateUserName.message});

      if(!validatePassword.valid)
        this.notification.alert({description: validatePassword.message});

      if(hasError){
        this.loader.hide();
        return;
      }

      this.notification.alert({description: 'Usuário ou senha inválidos!'});
      this.loader.hide();
    }


  }
}
