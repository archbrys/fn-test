import React, { Fragment } from "react";
import { Placeholder } from "react-bootstrap";
import { IBody, ITableData } from "../interface";
import Loader from "./Loader";
import Row from "./Row";

const Body = ({
  data,
  headerKeys,
  children,
  onRowClick,
  loading,
}: IBody): JSX.Element => {
  const iterateRow = (
    rowData: ITableData | ITableData[],
    index: number,
    previousData: ITableData | ITableData[],
  ): JSX.Element => {
    if (Array.isArray(rowData)) {
      return (
        <>
          {rowData.map((data, indexx) => {
            return (
              <Fragment key={`arr-${indexx}`}>
                <Row
                  rowData={data}
                  previousData={rowData[indexx - 1]}
                  headerKeys={headerKeys}
                  onRowClick={onRowClick}
                >
                  {children}
                </Row>
              </Fragment>
            );
          })}
        </>
      );
    }

    return (
      <Row
        rowData={rowData as ITableData}
        previousData={previousData as ITableData}
        headerKeys={headerKeys}
        onRowClick={onRowClick}
      >
        {children}
      </Row>
    );
  };

  return (
    <tbody>
      {loading ? (
        <Loader rowLength={headerKeys.length} />
      ) : (
        data.map((rowData: ITableData | ITableData[], index: number) => {
          return (
            <Fragment key={index}>
              {iterateRow(rowData, index, data[index - 1])}
            </Fragment>
          );
        })
      )}
    </tbody>
  );
};

export default Body;
