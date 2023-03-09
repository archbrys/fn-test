import React, { Fragment } from "react";
import { IBody, ITableData } from "../interface";
import Row from "./Row";

const Body = ({
  data,
  headerKeys,
  children,
  onRowClick,
}: IBody): JSX.Element => {
  return (
    <tbody>
      {data.map((rowData: ITableData, index: number) => {
        return (
          <Fragment key={index}>
            <Row
              key={index}
              rowData={rowData}
              headerKeys={headerKeys}
              onRowClick={onRowClick}
            >
              {children}
            </Row>
          </Fragment>
        );
      })}
    </tbody>
  );
};

export default Body;
