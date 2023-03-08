import React from "react";
import Header from "./Header";
import Body from "./Body";
import { ITable } from "../interface";
import { Table as TableUI, TableContainer } from "@chakra-ui/react";

const Table = ({
  data,
  headers,
  sortBy,
  sortDirection,
  loading,
  onSort,
  children,
}: ITable): JSX.Element => {
  const headerKeys = headers.map((header) => header.id);

  return (
    <>
      {loading && <span>lading</span>}
      <TableContainer>
        <TableUI>
          <Header
            headers={headers}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <Body data={data} headerKeys={headerKeys} children={children} />
        </TableUI>
      </TableContainer>
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
