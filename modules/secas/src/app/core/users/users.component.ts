import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundationCommonModule, LoaderService } from '@flexsuite/foundation';
import { ITablePaginated } from '@flexsuite/core/interfaces';

@Component({
  selector: 'secas-users',
  standalone: true,
  imports: [CommonModule, FoundationCommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(
    private loader: LoaderService
  ) {
    this.loader.hide()
  }

  tableInfo: ITablePaginated = {
    columns: [
      { label: 'Usuário', type: 'text' },
      { label: 'Prestador', type: 'text' },
      { label: 'Ativo', type: 'boolean' },
      { label: 'Ações', type: 'actions',
      actions: {
          edit: { active: true, execute: (row) => { console.log('Editando',row) } },
          delete: { active: true, execute: (row) => { console.log('Deletando',row) } },
          copy: { active: true, execute: (row) => { console.log('Copiando',row) } },
        }
      },
    ],
    rows: [
      {
        'Usuário': 'admin',
        'Prestador': '1 - Teste longo pra carambaaaaaaaaaaaaaaaaaaaaaaaaaa aso kdasokd asod ksaok ',
        'Ativo': 'true',
      },
      {
        'Usuário': 'admin',
        'Prestador': '1 - Teste',
        'Ativo': 'true',
      }
    ],
    totalRows: 1,
    currentPage: 1,
    rowsPerPage: 10,
    totalPages: 1,
    onChangePage: (page: number) => { console.log('changePage',page) },
    onChangeRowsPerPage: (rowsPerPage: number) => { console.log('changeRowsPerPage',rowsPerPage) },
    onSort: (key: string, sort: 'DESC' | 'ASC' | undefined) => { console.log('sort',key,sort) },
  }
}
