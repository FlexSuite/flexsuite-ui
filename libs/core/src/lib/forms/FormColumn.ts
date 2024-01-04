import { ColumnType } from "../enums";
import { IFormColumn } from "./IForm";
import { ITableColumn } from "./ITable";

export class FormColumn implements IFormColumn{
  private _key: string | undefined;
  private _label: string | undefined;
  private _description: string | undefined;
  private _type: ColumnType = 'default';
  private _formatValueFirst: boolean | undefined;
  private _formatter: (value: string) => string = (value: string) => value;

  key(key: string): FormColumn {
    this._key = key;
    return this;
  }

  label(label: string): FormColumn {
    this._label = label;
    return this;
  }

  description(description: string): FormColumn {
    this._description = description;
    return this;
  }

  type(type: ColumnType): FormColumn {
    this._type = type;
    return this;
  }

  formatValueFirst(): FormColumn {
    this._formatValueFirst = true;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter(formatter: (value: any) => string): FormColumn {
    this._formatter = formatter;
    return this;
  }

  build():ITableColumn {

    if(!this._key) throw new Error('Column key is required');
    if(!this._label) throw new Error('Column label is required');
    if(!this._type) throw new Error('Column type is required');

    return {
      key: this._key,
      label: this._label,
      description: this._description,
      type: this._type,
      formatter: this._formatter,
    }
  }
}
