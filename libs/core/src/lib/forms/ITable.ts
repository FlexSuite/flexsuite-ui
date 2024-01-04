import { Observable } from 'rxjs';
import { ColumnType } from "./ColumnType";

/**
 * Tabela paginada foundation
 * <foundation-table-paginated [table]="table"/>
 *
 */
export interface ITable {
  /** colunas da tabela */
  columns: ITableColumn[];
  /** linhas da tabela */
  rows: Observable<ITableRow[]>;
  /** paginação da tabela */
  pagination: ITablePagination
  /** ordenação da tabela */
  order?: Observable<ITableOrder>;
  /** ações da tabela */
  actions?: ITableRowActions;
  /** se a coluna de ações deve ser ocultada caso possua actions */
  hideActionsCol?: boolean;
}

/**
 * Coluna da tabela paginada foundation
 */
export interface ITableColumn extends ColumnSharedProps {
  /** propriedade de acesso ao valor da coluna */
  key: string;
  /** se a coluna é ordenável */
  orderable?: boolean;
  /** titulo apresentável da coluna */
  label: string;
  /** descrição da coluna */
  description?: string;
  /** tipo de coluna */
  type: ColumnType;
}


/**
 *  Ações das linhas na table-paginated
 */

export interface ITableRowActions {
  /** ação do clique na linha */
  click?: rowAction
  /** ação da edição na linha */
  edit?: rowAction
  /** ação da exclusão na linha */
  delete?: rowAction
  /** ação do refresh na linha */
  refresh?: rowAction
  /** ação de duplicar a linha */
  duplicate?: rowAction
}

/**
 * Ação da linha na table-paginated
 */
interface rowAction{
  /** desabilita action */
  disabled?: boolean;
  /** função da ação */
  execute: (row: ITableRow) => void;
}

/**
 * Paginação da tabela paginada foundation
 */
export interface ITablePagination {
  data: Observable<ITablePaginationData>;
  /**
   * ao mudar a pagina
   * @param page página atual
   */
  onChangePage: (page: number) => void;
  /**
   * ao mudar a quantidade de linhas por página
   * @param rowsPerPage quantidade de linhas por página
   */
  onChangePerPage: (rowsPerPage: number) => void;
}

export interface ITablePaginationData {
  /** página atual */
  page: number;
  /** quantidade de linhas por página */
  perPage: number;
  /** quantidade total de linhas */
  totalRows: number;
  /** quantidade total de páginas */
  totalPages: number;
}

/**
 * Ordenação da tabela paginada foundation
 */
export interface ITableOrder {
  /** desativa ordenação */
  disabled?: boolean;
  /** coluna ordenada */
  column?: ITableColumn;
  /** tipo de ordenação */
  order?: 'DESC' | 'ASC' | undefined;
  /**
   * ao mudar a ordenação
   * @param key coluna ordenada
   * @param order tipo de ordenação
   */
  onOrder?: (column: ITableColumn) => void;
}

/**
 * Linha da tabela paginada foundation
 */
export interface ITableRow {
  /** id da linha */
  id: string;
  /** chave da coluna */
  [key: string]: ITableColumnValue | string;
}


interface ColumnSharedProps {
  /** deve usar o valor cru */
  useRawValue?: boolean;
  /** formatação do valor */
  formatter?: (value: string) => string;
  /** permite alterações */
  allowUpdate?: boolean;
  /** permite null */
  allowNull?: boolean;
  /** permite undefined */
  allowUndefined?: boolean;
  /** permite vazio */
  allowEmpty?: boolean;
}

export interface ITableColumnValue extends ColumnSharedProps {
  /** valor da coluna */
  value: string;

}
