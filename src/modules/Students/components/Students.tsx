import { AspectRatio, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useEffect, useMemo } from "react";
import Images from "../../../common/Images";
import Table, { useTableState } from "../../../common/Table";
import { ITableData } from "../../../common/Table/interface";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchStudents } from "../actions";
import { OtherProperties, TableHeader } from "../constants";
import { IStudent } from "../interface";
import { studentState } from "../reducer";

interface ImageProps {
  src: string;
}
const ImageHolder = styled.div<ImageProps>`
  background-image: ${(props) => (props.src ? `url(${props.src})` : null)};
`;

const Students = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { students, status } = useAppSelector(studentState);
  const { sortBy, setSortBy, sortDirection, setSortDirection } =
    useTableState();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const sort = (data: IStudent[]) => {
    if (sortBy === undefined && sortDirection === undefined) return data;
    return data.sort(comparator);
  };

  const comparator = (a: IStudent, b: IStudent) => {
    const resultValue = getComparatorCondition(a, b, sortBy);

    if (resultValue === 0) {
      if (sortBy === "phone" || sortBy === "email") {
        return getComparatorCondition(a, b, "name");
      }
    }
    return resultValue;
  };

  const getComparatorCondition = (a: IStudent, b: IStudent, by: string) => {
    const x = sortDirection === "desc" ? b[by] : a[by];
    const y = sortDirection === "desc" ? a[by] : b[by];
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }

    return 0;
  };

  const sanitizeData = useMemo(
    (): ITableData[] =>
      students.map((student) => {
        const newStudent: ITableData = {
          ...(student as unknown as ITableData),
        };

        newStudent.profile_picture = `user_${newStudent?.id}`;

        return newStudent;
      }),
    [students],
  );

  const sanitizeTableData = (data: ITableData, key: string) => {
    switch (key) {
      case "profile_picture": {
        return (
          <Image
            borderRadius="full"
            objectFit="cover"
            boxSize="100px"
            src={Images[data.profile_picture]}
            fallbackSrc={Images.default}
            alt={data.name}
          />
        );
      }

      default:
        return "-";
    }
  };

  return (
    <>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : (
        <>
          <Table
            data={sanitizeData}
            headers={TableHeader}
            onSort={() => null}
            sortBy={sortBy}
            sortDirection={sortDirection}
          >
            {{
              [OtherProperties.Profile]: (data: ITableData) =>
                sanitizeTableData(data, "profile_picture"),
            }}
          </Table>
        </>
      )}
      {students.length === 0 && <span>"No data found"</span>}
    </>
  );
};

export default Students;
