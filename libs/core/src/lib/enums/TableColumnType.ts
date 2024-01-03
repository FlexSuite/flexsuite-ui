export type TableColumnType =
    'default' //Sem formatação
  | 'text' //Se Formatação disponivel chamada
  | 'number'
  | 'boolean'
  | 'actions'
  | 'select'
  | 'checkbox'

export type TableColumnSort = 'ASC' | 'DESC' | undefined;
