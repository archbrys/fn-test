export interface ITable extends IHeader {
  data: Array<ITableData>,
  loading: boolean,
  children?: any,
}

export interface ITableHeader {
  id: string
  name: string
  isSortable?: boolean | undefined
  tableSpacing?: number
}

export interface ITableData {
  id: string
  [key: string]: any
}


export interface IBody {
  data: Array<ITableData>
  headerKeys: string[]
  children?: any
}

export interface IRow {
  rowData: ITableData
  headerKeys: string[]
  children?: any
}

export interface IHeader {
  headers: ITableHeader[]
  sortBy?: string
  sortDirection?:string
  onSort: (headerId: string) => void
}