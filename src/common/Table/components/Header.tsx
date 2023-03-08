import { Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { IHeader, ITableHeader } from "../interface";

const Header = ({ headers, sortBy, sortDirection, onSort }: IHeader) => {
  const handleSort = (
    headerId: string,
    isSortable: boolean | undefined,
  ): void => {
    if (onSort && isSortable) onSort(headerId);
  };

  const renderHeaderCell = (key: string, headerCell: ITableHeader) => {
    return (
      <th
        onClick={() => handleSort(headerCell.id, headerCell.isSortable)}
        key={key}
      >
        <span>{headerCell.name}</span>
        {sortBy === headerCell.id ? (
          <>{sortDirection === "desc" ? "▼" : "▲"}</>
        ) : null}
      </th>
    );
  };

  return (
    <Thead>
      <Tr>
        {headers.map((headerCell) =>
          renderHeaderCell(headerCell.id, headerCell),
        )}
      </Tr>
    </Thead>
  );
};

Header.defaultProps = {
  headers: [],
  sortDirection: undefined,
  sortBy: undefined,
  onSort: undefined,
};

export default Header;
