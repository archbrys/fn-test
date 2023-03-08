import { Center, Tbody, Td, Tr } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { IBody, ITableData } from "../interface";
import Row from "./Row";

const Body = ({ data, headerKeys, children }: IBody): JSX.Element => {
  return (
    <Tbody>
      {data.map((rowData: ITableData, index: number) => {
        return (
          <Fragment key={index}>
            <Row key={index} rowData={rowData} headerKeys={headerKeys}>
              {children}
            </Row>
          </Fragment>
        );
      })}
    </Tbody>
  );
};

export default Body;
