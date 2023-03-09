import React from "react";
import Header from "./Header";
import Body from "./Body";
import { ITable } from "../interface";
import TableUI from "react-bootstrap/Table";
import { Message } from "../styles";

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
          loading={loading}
        />
      </TableUI>

      {loading ? null : Array.isArray(data) && data.length === 0 ? (
        <Message>No data found</Message>
      ) : null}
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
