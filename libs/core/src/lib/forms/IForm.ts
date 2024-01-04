import { ColumnType } from "../enums";
import { FormBase } from "./FormBase";
import { FormColumn } from "./FormColumn";
import { ITableColumn, ITableRowActions } from "./ITable";

export interface IFormBase<T> {
  columns(...columns: IFormColumn[]): FormBase<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data( cbData: (props: IFormPaginatorCbProps) => Promise<IFormData<T>>  ): FormBase<T>;
  actions(...actions: ITableRowActions[]): FormBase<T>;
  orderable(): FormBase<T>;
  paginable(): FormBase<T>;
  paginator(info: IFormPaginator): FormBase<T>;
  hideActionsCol(): FormBase<T>;
}

export interface IFormColumn{
  key(key: string): FormColumn;
  label(label: string): FormColumn;
  description(description: string): FormColumn;
  type(type: ColumnType): FormColumn;
  formatValueFirst(): FormColumn;
  formatter(formatter: (value: string) => string): FormColumn;
  build(): ITableColumn;
}

export interface IFormObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IFormPaginator {
  /** página atual */
  page: number;
  /** quantidade de linhas por página */
  perPage: number;
  /** quantidade total de linhas */
  totalRows: number;
  /** quantidade total de páginas */
  totalPages: number;
}

export interface IFormPaginatorCbProps {
  page: number;
  perPage: number;
}

export interface IFormData<T>{
  objects: T[];
  paginator: IFormPaginator;
}
