import React from "react";
import { Placeholder } from "react-bootstrap";

interface LoaderProps {
  rowLength: number;
}

const Loader = ({ rowLength }: LoaderProps): JSX.Element => {
  return (
    <>
      {new Array(5).fill(null).map(() => {
        return (
          <tr>
            {new Array(rowLength).fill(null).map((index) => {
              return (
                <td>
                  <Placeholder as="p" animation="wave">
                    <Placeholder xs={12} size="lg" />
                  </Placeholder>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default Loader;
