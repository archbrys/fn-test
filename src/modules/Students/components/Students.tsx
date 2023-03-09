import React, { useEffect, useMemo } from "react";
import Images from "../../../common/Images";
import Table, { useTableState } from "../../../common/Table";
import { ITableData } from "../../../common/Table/interface";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCourses } from "../../Course/actions";
import { fetchProfiles } from "../../Profile/actions";
import { IProfileStatus } from "../../Profile/interface";
import { fetchStudents } from "../actions";
import { OtherProperties, Status, TableHeader } from "../constants";
import { useGetStudentData } from "../hooks/useGetUserData";
import { IStudent } from "../interface";
import { studentState } from "../reducer";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomImage } from "../styles";

const Students = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { students, status } = useAppSelector(studentState);
  const { sortBy, setSortBy, sortDirection, setSortDirection } =
    useTableState();
  const { data, loading, getStatusValue } = useGetStudentData();

  useEffect(() => {
    // dispatch(fetchStudents());
    // dispatch(fetchCourses());
    // dispatch(fetchProfiles());
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
      data.map((student) => {
        const newStudent: ITableData = {
          ...(student as unknown as ITableData),
        };
        let profile =
          Array.isArray(newStudent.profiles) && !newStudent.profiles.length
            ? []
            : newStudent.profiles[0] || [];

        newStudent.profile_picture = `${profile?.user_id}`;

        return newStudent;
      }),
    [data],
  );

  const sanitizeTableData = (data: ITableData, key: string) => {
    switch (key) {
      case OtherProperties.Profile: {
        return (
          <CustomImage
            roundedCircle
            fluid
            src={Images[data.profile_picture] || Images.default}
            alt={data.name}
          />
        );
      }

      case OtherProperties.Major: {
        return data.profiles[0]?.major || "";
      }

      case OtherProperties.Status: {
        return getStatusValue(data.profiles);
      }

      case OtherProperties.Total_Course: {
        return !data.courses.length ? "0" : data.courses.length;
      }

      default:
        return "-";
    }
  };

  const handleRowClick = (data: ITableData): void => {
    navigate(`/${data.id}`);
  };

  return (
    <>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : (
        <Container>
          <Table
            data={sanitizeData}
            headers={TableHeader}
            onSort={() => null}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onRowClick={handleRowClick}
          >
            {{
              [OtherProperties.Profile]: (data: ITableData) =>
                sanitizeTableData(data, OtherProperties.Profile),
              [OtherProperties.Major]: (data: ITableData) =>
                sanitizeTableData(data, OtherProperties.Major),
              [OtherProperties.Status]: (data: ITableData) =>
                sanitizeTableData(data, OtherProperties.Status),
              [OtherProperties.Total_Course]: (data: ITableData) =>
                sanitizeTableData(data, OtherProperties.Total_Course),
            }}
          </Table>
        </Container>
      )}
      {students.length === 0 && <span>"No data found"</span>}
    </>
  );
};

export default Students;
