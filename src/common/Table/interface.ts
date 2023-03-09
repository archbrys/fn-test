export interface ITable extends IHeader {
  data: ITableData[] | ITableData[][];
  loading: boolean;
  children?: any;
  onRowClick?: (data: ITableData) => void;
}

export interface ITableHeader {
  id: string;
  name: string;
  isSortable?: boolean | undefined;
  tableSpacing?: number;
  key?: string;
}

export interface ITableData {
  id: string;
  [key: string]: any;
}

export interface IBody {
  data: ITableData[] | ITableData[][];
  headerKeys: string[];
  children?: any;
  onRowClick?: (data: ITableData) => void;
  loading?: boolean;
}

export interface IRow {
  rowData: ITableData;
  previousData: ITableData;
  headerKeys: string[];
  children?: any;
  onRowClick?: (data: ITableData) => void;
}

export interface IHeader {
  headers: ITableHeader[];
  sortBy?: string;
  sortDirection?: string;
  onSort: (headerId: string, key: string | undefined) => void;
}
