import { ITableColumn } from "./ITable";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function validateColumnValue(column: ITableColumn, value: any){
  switch(column.type){
    case 'boolean':
    case 'checkbox':
      return validateBoolean(value);
    case 'number':
    case 'currency':
    case 'percent':
      return validateNumber(value);
    case 'datetime':
    case 'date':
    case 'time':
      return validateDate(value);

    default:
    case 'default':
    case 'rawformmated':
    case 'textformatted':
    return true;
  }
}

function validateBoolean(value: any): boolean {
  return typeof value === 'boolean' || (
    //Validação dos valores possiveis
    typeof value === 'string' && ( value.toLowerCase() === 'true' || value.toLowerCase() === 'false' ),
    typeof value === 'number' && ( value === 0 || value === 1 )
  );
}

function validateNumber(value: any): boolean {
  return typeof value === 'number' || (
    //Validação dos valores possiveis
    typeof value === 'string' && !isNaN(Number(value))
  );
}

function validateDate(value: any): boolean {
  return typeof value === 'string' && !isNaN(Date.parse(value));
}
