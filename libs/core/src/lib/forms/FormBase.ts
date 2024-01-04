import { BehaviorSubject, Observable } from "rxjs";
import { ITable, ITableColumn, ITableRow, ITableRowActions, ITableOrder, ITablePaginationData } from "./ITable";
import { IFormBase, IFormColumn, IFormData, IFormObject, IFormPaginator, IFormPaginatorCbProps } from "./IForm";
import { validateColumnValue } from "./FormUtils";


export class FormBase<RawType> implements IFormBase<RawType>{
  static DEFAULT_PER_PAGE = 20;
  static DEFAULT_ID_KEY = 'id';

  protected _formName: string = 'DEFAULT_FORM_NAME';

  protected _loading: BehaviorSubject<boolean>;
  protected _reload: BehaviorSubject<boolean>;
  protected _ready: BehaviorSubject<boolean>;

  protected _columns: IFormColumn[];
  protected _objects: IFormObject[];
  protected _rows: BehaviorSubject<ITableRow[]>;
  protected _actions: ITableRowActions;
  protected _orderable: boolean;
  protected _orderator: BehaviorSubject<ITableOrder>;
  protected _paginable: boolean;
  protected _hideActionsCol: boolean;

  protected _table: ITable;

  //To-Do talvez precise ser observable
  protected _paginator: BehaviorSubject<IFormPaginator>;
  protected _pagination: BehaviorSubject<ITablePaginationData>
  protected _id_key: string = FormBase.DEFAULT_ID_KEY;

  protected _cbData: ((props: IFormPaginatorCbProps) => Promise<IFormData<RawType>> ) | undefined

  constructor(formName: string) {
    this._formName = formName.toUpperCase();
    this._columns = [];
    this._objects = [];
    this._actions = {};
    this._orderable = false;
    this._paginable = false;
    this._hideActionsCol = false;

    this._loading = new BehaviorSubject<boolean>(true);
    this._reload = new BehaviorSubject<boolean>(false);
    this._ready = new BehaviorSubject<boolean>(false);
    this._rows = new BehaviorSubject<ITableRow[]>([]);
    this._orderator = new BehaviorSubject<ITableOrder>({
      column: {} as ITableColumn,
      order: 'DESC',
      disabled: true,
      onOrder: this.onOrder,
    });
    this._pagination = new BehaviorSubject<ITablePaginationData>({
      page: 1,
      perPage: FormBase.DEFAULT_PER_PAGE,
      totalRows: 0,
      totalPages: 0
    });



    this._paginator = new BehaviorSubject<IFormPaginator>({
      page: 1,
      perPage: FormBase.DEFAULT_PER_PAGE,
      totalPages: 0,
      totalRows: 0
    });

    this._table = {} as ITable;

    this._reload.subscribe(reload => {
      if(reload){
        this.refresh()
      }
    })
  }

  //Getters Variables
  get loading(): Observable<boolean> { return this._loading.asObservable(); }
  get loadingValue(): boolean { return this._loading.value; }

  get ready(): Observable<boolean> { return this._ready.asObservable(); }
  get readyValue(): boolean { return this._ready.value; }

  get orderer(): Observable<ITableOrder> { return this._orderator.asObservable(); }
  get ordererValue(): ITableOrder { return this._orderator.value; }

  //Chain Functions

  columns(...columns: IFormColumn[]): FormBase<RawType> {
    this._columns = columns;
    return this;
  }

  id(key: string): FormBase<RawType> {
    this._id_key = key;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data( cbData: (props: IFormPaginatorCbProps) => Promise<IFormData<RawType>> ): FormBase<RawType> {
    this._cbData = cbData;

    cbData(this.getCbDataProps())
      .then(rawData => {
        try{
          this._objects = rawData.objects.map(raw => this.buildFormObject(raw));
          this._paginator.next(rawData.paginator);
          this._loading.next(false);
          this.buildTable();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(e: any){
          this.errorHandler(e, `Error building form objects`);
        }
      })

    return this;
  }

  actions(actions: ITableRowActions): FormBase<RawType> {
    this._actions = actions;
    return this;
  }

  orderable(): FormBase<RawType> {
    this._orderable = true;
    return this;
  }

  paginable(): FormBase<RawType> {
    this._paginable = true;
    return this;
  }

  hideActionsCol(): FormBase<RawType> {
    this._hideActionsCol = true;
    return this;
  }

  paginator(info: IFormPaginator): FormBase<RawType> {
    this._paginator.next(info);
    return this;
  }

  private refresh(): void {
    this._reload.next(false);

    this.blockLoading();
    this._cbData?.(this.getCbDataProps())
      .then( () => {
        this._loading.next(false);
        this.buildTable();
    })
  }

  reload(): void {

    this._reload.next(true);
  }

  protected blockLoading(): void {
    this._loading.next(true);
  }

  //Generators

  table(): ITable {
    try{
      if(!this._ready.value) throw new Error(`${this._formName} Form is not ready`);
      return this._table;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(e: any){
      this.errorHandler(e, `Error getting table`);
    }
    return {} as ITable;
  }

  private buildTable(){
    this.checkColumns();
    this.checkRows();
    this.buildRows();
    this.buildFirstOrderer();


    this._table = {
      columns: this._columns.map(column => column.build()),
      rows: this._rows.asObservable(),
      actions: this._actions,
      order: this.orderer,
      pagination: {
        onChangePage: () => {throw new Error(`${this._formName} onChangePage is not implemented`)},
        onChangePerPage: () => {throw new Error(`${this._formName} onChangePerPage is not implemented`)},
        data: this._pagination.asObservable()
      }
    }


    this._ready.next(true);

  }

  private buildRows(){
    this._objects.forEach(object => {
      const row: ITableRow = {
        id: object[FormBase.DEFAULT_ID_KEY]
      };

      this._columns.forEach(column => {
        const columnBuild = column.build();
        const columnKey = columnBuild.key;

        row[columnKey] = {
          value: object[columnKey],
          allowEmpty: columnBuild.allowEmpty,
          allowNull: columnBuild.allowNull,
          allowUndefined: columnBuild.allowUndefined,
          allowUpdate: columnBuild.allowUpdate,
          formatter: columnBuild.formatter,
          useRawValue: columnBuild.useRawValue
        };
      })

      this._rows.next([...this._rows.value, row])
    })


  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildFormObject(rawValue: any){
    //check if data is an object
    if(typeof rawValue !== 'object') throw new Error(`${this._formName} Data must be an object`);

    //build form object from columns keys
    const formObject: IFormObject = {};

    this._columns.forEach(column => {
      const columnKey = column.build().key
      formObject[FormBase.DEFAULT_ID_KEY] = this.getIdValueFromRawValue(rawValue);
      formObject[columnKey] = rawValue[columnKey];
    })

    return formObject;
  }

  private buildFirstOrderer(){
    if(!this._orderable) return;
    this._orderator.next({
      column: this._columns[0].build(),
      order: 'DESC',
      disabled: false,
      onOrder: this.onOrder,
    })
  }

  //

  private checkColumns(){
    if(this._columns.length === 0) throw new Error(`${this._formName} Columns are required`);
    this._columns.forEach(column => { this.checkColumnType(column.build()) })
  }

  private checkColumnType(buildedColumn: ITableColumn){
    this._objects.forEach(object => {
      const value = this.getKeyValueFromObject(buildedColumn.key, object);

      //Validação das tipagens
      if(!validateColumnValue(buildedColumn,value)){
        throw new Error(`${this._formName} Column ${buildedColumn.key} value ${value} is not a valid ${buildedColumn.type}`);
      }
    })
  }

  private checkRows(){
    this._objects.forEach(object => {
      this._columns.forEach(column => {
        const value = this.getKeyValueFromObject(column.build().key, object);
        if(!validateColumnValue(column.build(),value)){
          throw new Error(`${this._formName} Column ${column.key} value ${value} is not a valid ${column.type}`);
        }
      })
    })
  }


  //utils
  private getKeyValueFromObject(key: string, object: IFormObject){
    //se não tiver a key
    if(!object[key]) throw new Error(`${this._formName} Key ${key} not found in object ${object}`);
    //se tiver a key
    return object[key];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getIdValueFromRawValue(rawValue: any){
    if(!rawValue) throw new Error(`${this._formName} Raw value is required`);
    if(!rawValue[this._id_key]) {
      const errorMsg = `${this._formName} Identificator not found in raw value`
      console.log(errorMsg,Object.keys(rawValue))
      throw new Error(errorMsg)
    };

    return rawValue[this._id_key];
  }

  //Others Getters

  private getActualPage(){
    return this._paginator.value.page;
  }

  private getPerPage(){
    return this._paginator.value.perPage;
  }

  private getCbDataProps():IFormPaginatorCbProps{
    return {
      page: this.getActualPage(),
      perPage: this.getPerPage()
    }
  }

  private getActualOrder(): ITableOrder {
    if(this._orderator.value.disabled)
      throw new Error(`${this._formName} Order is disabled`);

    return this._orderator.value;
  }

  private getObjectFromRow(row: ITableRow): IFormObject {
    const object = this._objects.find(object => object[this._id_key] === row.id);
    if(!object) throw new Error(`${this._formName} Object not found for row ${row.id}`);
    return object;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getColumnValue(row: ITableRow, column: ITableColumn): any {
    const object = this.getObjectFromRow(row);
    const formatter = column.formatter;

    if(column.useRawValue) return object[column.key];

    return formatter ? formatter(object[column.key]) : object[column.key];
  }


  //Handlers

  errorHandler(error: Error, message?: string): void {
    console.error(message);
    throw error;
  }

  //Events
  onOrder(column: ITableColumn): void {


    const actualOrderer = this._orderator.value;
    if(actualOrderer.column === column){
      if(actualOrderer.order === 'ASC'){
        this._orderator.next({
          column: column,
          order: 'DESC'
        })
        return;
      }
      this._orderator.next({
        column: column,
        order: 'ASC'
      })
      return;
    }

    this._orderator.next({
      column: column,
      order: 'ASC'
    })

  }
}
