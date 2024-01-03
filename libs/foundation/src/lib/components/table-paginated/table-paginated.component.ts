import { Component, Input } from '@angular/core';
import { CoreEnums, CoreInterfaces } from '@flexsuite/core';

@Component({
  selector: 'foundation-table-paginated',
  templateUrl: './table-paginated.component.html',
  styles: ``,
})
export class TablePaginatedComponent {
  @Input({required:true}) info: CoreInterfaces.ITablePaginated | undefined

  actionStatus = CoreEnums.FlexSuiteFormActionStatus

  status:CoreEnums.FlexSuiteFormActionStatus = CoreEnums.FlexSuiteFormActionStatus.EDITING

  private selectedIndex: number | undefined
  private selectedRow: CoreInterfaces.ITablePaginatedRow | undefined
  private nextRow: CoreInterfaces.ITablePaginatedRow | undefined
  private previousRow: CoreInterfaces.ITablePaginatedRow | undefined

  get columns(): CoreInterfaces.ITablePaginatedColumn[] {
    return this.info?.columns || []
  }

  get dataColumns(): CoreInterfaces.ITablePaginatedColumn[] {
    return this.info?.columns.filter(col => col.type != 'actions') || []
  }

  get rows(): CoreInterfaces.ITablePaginatedRow[] {
    return this.info?.rows || []
  }

  get hasActions(): boolean {
    return this.columns.some(column => column.type === 'actions')
  }

  get actions(): CoreInterfaces.TablePaginatedColActions {
    if(!this.hasActions) return {}
    const column = this.columns.find(column => column.type === 'actions')
    return column?.actions || {}
  }


  //Row Value Helpers

  rowValue(row: CoreInterfaces.ITablePaginatedRow, column: CoreInterfaces.ITablePaginatedColumn): string {
    const key = column.key || column.label
    return row[key] || ''
  }

  checkHasRowSelected(): boolean {
    return this.selectedRow !== undefined
  }

  checkHasNextRow(): boolean {
    return this.nextRow !== undefined
  }

  checkHasPreviousRow(): boolean {
    return this.previousRow !== undefined
  }

  checkHasRowActions(): boolean {
    return this.hasActions && this.selectedRow !== undefined
  }

  checkClickedOnSameRow(row: CoreInterfaces.ITablePaginatedRow): boolean {
    return this.selectedRow === row
  }


  //Row actions and manipulation

  onSelectedRowFocused(row: CoreInterfaces.ITablePaginatedRow){
    return this.selectedRow === row
  }

  onRowClick(row: CoreInterfaces.ITablePaginatedRow){
    if(this.checkClickedOnSameRow(row)) return

    this.resetRow()
    this.setSelectedRow(row)
    this.verifyNextRow()
    this.verifyPreviousRow()

    console.log('setSelectedRow', {
      status: this.status,
      row,
      actualIndex:this.selectedIndex,
      nextRow: this.nextRow,
      previousRow: this.previousRow,
    })
  }

  setSelectedRow(row: CoreInterfaces.ITablePaginatedRow){
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
    console.log('resetingRow')
    this.selectedIndex = undefined
    this.selectedRow = undefined
    this.nextRow = undefined
    this.previousRow = undefined
  }
}
