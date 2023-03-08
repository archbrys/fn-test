import { Td, Tr } from "@chakra-ui/react";
import React from "react";
import { IRow, ITableData } from "../interface";

const Row = ({ rowData, headerKeys, children }: IRow) => {
  // Add the missing key value
  const sanitizeRowData = (data: ITableData): ITableData => {
    const newData = { ...data };
    headerKeys.forEach((key) => {
      if (!rowData[key]) {
        newData[key] = null;
      }
    });
    return newData;
  };

  const getCells = (data: ITableData) => {
    const arrCells = Object.entries(sanitizeRowData(data));

    const newCells: any = [];
    headerKeys.forEach((header) =>
      arrCells.forEach(([index, value]) => {
        if (header === index) {
          newCells.push([index, value]);
        }
      }),
    );

    return newCells;
  };

  const getValue = (key: string, value: ITableData) => {
    return children && key in children && children[key]
      ? typeof children[key] === "function"
        ? children[key](rowData) || ""
        : children[key] || ""
      : value;
  };

  return (
    <>
      <Tr>
        {getCells(rowData).map(
          ([key, value]: [string, ITableData]): JSX.Element => {
            return <Td key={`${key}-td`}>{getValue(key, value)}</Td>;
          },
        )}
      </Tr>
    </>
  );
};

Row.defaultProps = {
  children: null,
};

export default Row;
