import React from "react";
import Header from "./Header";
import Body from "./Body";
import { ITable } from "../interface";
import TableUI from "react-bootstrap/Table";

const Table = ({
  data,
  headers,
  sortBy,
  sortDirection,
  loading,
  onSort,
  onRowClick,
  children,
}: ITable): JSX.Element => {
  const headerKeys = headers.map((header) => header.id);

  return (
    <>
      {loading && <span>lading</span>}
      <TableUI striped bordered hover>
        <Header
          headers={headers}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <Body
          data={data}
          headerKeys={headerKeys}
          children={children}
          onRowClick={onRowClick}
        />
      </TableUI>
    </>
  );
};

Table.defaultProps = {
  children: null,
  sortBy: undefined,
  sortDirection: undefined,
  loading: null,
  data: [],
  headers: [],
  subKey: null,
};

export default Table;
