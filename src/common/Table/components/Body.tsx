import { Center, Tbody, Td, Tr } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { IBody, ITableData } from "../interface";
import Row from "./Row";

const Body = ({ data, headerKeys, subKey, children }: IBody): JSX.Element => {
  return (
    <Tbody>
      {data.map((rowData: ITableData, index: number) => {
        return (
          <Fragment key={index}>
            <Row key={index} rowData={rowData} headerKeys={headerKeys}>
              {children}
            </Row>
            {!!subKey && rowData[subKey].length !== 0 ? (
              rowData[subKey].map((subData: ITableData, ii: number) => {
                return (
                  <Row
                    key={`${ii}-row`}
                    hasSubkey={!!subKey}
                    rowData={subData}
                    headerKeys={headerKeys}
                  >
                    {children}
                  </Row>
                );
              })
            ) : (
              <Tr key="no-data-row">
                <Td key="no-data" colSpan={7}>
                  <Center>No data found</Center>
                </Td>
              </Tr>
            )}
          </Fragment>
        );
      })}
    </Tbody>
  );
};

export default Body;
