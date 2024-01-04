export type ColumnType =
   'default' //Sem formatação
  | 'rawformmated' //Com formatação no rawValue
  | 'textformatted' //Com formatação no value
  | 'number' //Com formatação de número
  | 'date' //Com formatação de data
  | 'datetime' //Com formatação de data e hora
  | 'time' //Com formatação de hora
  | 'currency' //Com formatação de moeda
  | 'percent' //Com formatação de porcentagem
  | 'boolean' //Com formatação de booleano (Verdadeiro e Falso)
  | 'checkbox' //Com formatação de checkbox (Marcado e Desmarcado)

export type ColumnSort = 'ASC' | 'DESC' | undefined;
