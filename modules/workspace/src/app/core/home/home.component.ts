import { Component } from "@angular/core";
import { LoaderService } from "@flexsuite/foundation/services";

@Component({
  selector: 'workspace-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'workspace';

  constructor(
    private loader: LoaderService
  ){
    this.loader.info('Carregando workspace...')
    //Simula carregamento
    setTimeout(() => {
      this.loader.hide();
      // this.loader.error([
      //   'Erro ao carregar workspace',
      //   'Descrição porque não foi possivel carregar',
      //   'Talvez apresentar o Código de erro'
      // ]);
    }, 2000);
  }
}
