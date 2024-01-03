import { TableColumnType } from "../enums/TableColumnType";

export interface TablePaginatedColActions {
  click?: colAction
  edit?: colAction
  delete?: colAction
  copy?: colAction
  openSelect?: colAction
  changeCheckbox?: colAction
}

interface colAction {
  active: boolean;
  execute: (row: ITablePaginatedRow) => void;
}

export interface ITablePaginatedColumn {
  type: TableColumnType;
  actions?: TablePaginatedColActions;
  label: string;
  key?: string;
  sortable?: boolean;
  format?: (value: string) => string;
  selectValues?: () => { id: number, value: string}[];
}

export interface ITablePaginatedRow {
  [key: string]: string;
}

export interface ITablePaginated {
  columns: ITablePaginatedColumn[];
  rows: ITablePaginatedRow[];
  totalRows: number;
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  sortKey?: string;
  sort?: 'DESC' | 'ASC';
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
  onSort: (key: string, sort: 'DESC' | 'ASC' | undefined) => void;
}
