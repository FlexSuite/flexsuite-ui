import { CoreInterfaces } from "@flexsuite/core";
import { FormBase, FormColumn , IFormData, IFormPaginatorCbProps } from "@flexsuite/core/forms";
import { LoaderService } from "@flexsuite/foundation";

export class UserForm extends FormBase<CoreInterfaces.SECAS.SystemUser>{
  constructor(
    private loader: LoaderService
  ){
    super('UserForm');

    this.constructColumns()
    this.constructBase()
    this.loader.await(this._loading)
  }

  private getFormData(props: IFormPaginatorCbProps){
    //To-DO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<IFormData<CoreInterfaces.SECAS.SystemUser>>((resolve) => {
      // Simula um atraso aleatório antes de resolver a Promise
      setTimeout(() => {
        const formData:IFormData<CoreInterfaces.SECAS.SystemUser> = {
          paginator: {
            page: props.page,
            perPage: props.perPage,
            totalRows: 2,
            totalPages: 1,
          },
          objects: [
            {
              id: 1,
              username: 'admin',
              provider: {
                id: 1,
                name: {
                  first: 'Admin',
                  last: 'Admin',
                },
              },
              active: true,
            },
            {
              id: 2,
              username: 'user',
              provider: {
                id: 2,
                name: {
                  first: 'User',
                  last: 'User',
                },
              },
              active: true,
            }
          ]
        } ;
        resolve(formData);
      }, Math.random() * 2000);
    });
  }

  private constructColumns(){
    this.columns(
      new FormColumn().key('username').label('Usuário'),
      new FormColumn().key('provider').label('Prestador')
        .formatter(
          (provider:CoreInterfaces.SECAS.CompanyProvider) => {
            if(provider.name.chosen)
              return provider.name.chosen
            return `${provider.name.first} ${provider.name.last}`
          }
        ),
      new FormColumn().key('active').label('Ativo').type('checkbox')
    )
  }

  private constructBase(){
    this.data(this.getFormData)
    .actions({

    })
    .orderable()
    .paginable()
    .hideActionsCol();
  }


  override errorHandler(error: Error, message?: string): void {
    message = `${message}`
    this.loader.error(message ? [message,error.message]:error.message,error)
  }


  override blockLoading(): void {
    super.blockLoading()
    this.loader.show()
    this.loader.await(this._loading)
  }

}
