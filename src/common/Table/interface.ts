export interface ITable extends IHeader {
  data: Array<ITableData>;
  loading: boolean;
  children?: any;
  onRowClick?: (data: ITableData) => void;
}

export interface ITableHeader {
  id: string;
  name: string;
  isSortable?: boolean | undefined;
  tableSpacing?: number;
}

export interface ITableData {
  id: string;
  [key: string]: any;
}

export interface IBody {
  data: Array<ITableData>;
  headerKeys: string[];
  children?: any;
  onRowClick?: (data: ITableData) => void;
}

export interface IRow {
  rowData: ITableData;
  headerKeys: string[];
  children?: any;
  onRowClick?: (data: ITableData) => void;
}

export interface IHeader {
  headers: ITableHeader[];
  sortBy?: string;
  sortDirection?: string;
  onSort: (headerId: string) => void;
}
