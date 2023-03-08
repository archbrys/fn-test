import React from "react";
import Header from "./Header";
import Body from "./Body";
import { ITable } from "../interface";

const Table = ({
  data,
  headers,
  subKey,
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
      <table>
        <Header
          headers={headers}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={onSort}
        />
        <Body
          data={data}
          subKey={subKey}
          headerKeys={headerKeys}
          children={children}
        />
      </table>
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
