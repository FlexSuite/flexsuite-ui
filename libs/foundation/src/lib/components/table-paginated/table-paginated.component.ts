import { Component, Input, OnInit } from '@angular/core';
import { CoreEnums, CoreIcons, Form } from '@flexsuite/core';

@Component({
  selector: 'foundation-table-paginated',
  templateUrl: './table-paginated.component.html',
  styles: ``,
})
export class TablePaginatedComponent implements OnInit{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input({required:true}) form: Form.FormBase<any> | undefined

  private actionStatus = CoreEnums.FlexSuiteFormActionStatus
  private status:CoreEnums.FlexSuiteFormActionStatus = CoreEnums.FlexSuiteFormActionStatus.EDITING
  private table: Form.ITable | undefined
  private selectedIndex: number | undefined
  private selectedRow: Form.ITableRow | undefined
  private nextRow: Form.ITableRow  | undefined
  private previousRow: Form.ITableRow  | undefined
  rows: Form.ITableRow[] = []
  loading:boolean = true

  editIcon = CoreIcons.editIcon
  deleteIcon = CoreIcons.deleteIcon

  ngOnInit(): void {
    if(!this.form){
      throw new Error('Form is required')
    }

    this.form.loading.subscribe(loading => {
      this.loading = loading

    })

    this.form.ready.subscribe(ready => {

      if(!ready) return
      this.table = this.form?.table()

      this.table?.rows?.subscribe(rows => {
        this.rows = rows

      })
    })
  }


  get columns(): Form.ITableColumn[] {
    return this.table?.columns || []
  }

  get dataColumns(): Form.ITableColumn[] {
    return this.table?.columns.filter(col => typeof col != 'string') || []
  }

  get hasActions(): boolean {
    return this.table?.actions !== undefined
  }

  get actions(): Form.ITableRowActions| void {
    if(!this.hasActions)
      return
    return this.table?.actions
  }

  get showActions(): boolean {
    return this.hasActions && !this.table?.hideActionsCol
  }


  rowValue(row:  Form.ITableRow, column:  Form.ITableColumn) {
    return this.form?.getColumnValue(row, column)
  }


  checkClickedOnSameRow(row:  Form.ITableRow): boolean {
    return this.selectedRow === row
  }



  //Row actions and manipulation

  onSelectedRowFocused(row:  Form.ITableRow){
    return this.selectedRow === row
  }

  onRowClick(row:  Form.ITableRow){
    if(this.checkClickedOnSameRow(row)){
      // this.resetRow()
      return
    }

    this.resetRow()
    this.setSelectedRow(row)
    this.verifyNextRow()
    this.verifyPreviousRow()
  }

  setSelectedRow(row:  Form.ITableRow){
    this.selectedRow = row
    this.selectedIndex = this.rows.indexOf(row)
  }

  verifyNextRow(){
    if(this.selectedIndex === undefined) return
    this.nextRow = this.rows[this.selectedIndex+1]
  }

  verifyPreviousRow(){
    if(this.selectedIndex === undefined) return
    this.previousRow = this.rows[this.selectedIndex-1]
  }

  resetRow(){

    this.selectedIndex = undefined
    this.selectedRow = undefined
    this.nextRow = undefined
    this.previousRow = undefined
  }

  enableToUpdate(){
  }

}
