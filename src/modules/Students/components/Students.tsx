import React, { useEffect, useMemo } from "react";
import Images from "../../../common/Images";
import Table, { useTableState } from "../../../common/Table";
import { ITableData } from "../../../common/Table/interface";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCourses } from "../../Course/actions";
import { fetchProfiles } from "../../Profile/actions";
import { IProfileStatus } from "../../Profile/interface";
import { fetchStudents } from "../actions";
import {
  OtherProperties,
  Status,
  StudentProperties,
  TableHeader,
} from "../constants";
import { useGetStudentData } from "../hooks/useGetUserData";
import { IStudent } from "../interface";
import { studentState } from "../reducer";

import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomImage, InputText } from "../styles";

const Students = (): JSX.Element => {
  const navigate = useNavigate();
  const { students, status } = useAppSelector(studentState);
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    sortDepthKey,
    setSortDepthKey,
  } = useTableState();
  const { data, loading, getStatusValue, setFilter } = useGetStudentData();

  const sort = (data: ITableData[]) => {
    if (sortBy === undefined && sortDirection === undefined) return data;
    return data.sort(comparator(sortDepthKey));
  };

  const comparator = (key: any) => (a: ITableData, b: ITableData) => {
    if (key) {
      return getComparatorCondition(a[key], b[key], sortBy);
    }

    return getComparatorCondition(a, b, sortBy);
  };

  const getComparatorCondition = (a: ITableData, b: ITableData, by: string) => {
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

        newStudent.profile_picture = `${newStudent.profile?.user_id}`;

        return newStudent;
      }),
    [data],
  );

  const sanitizeTableData = (data: ITableData, key: string) => {
    switch (key) {
      case StudentProperties.Name: {
        const nickname = data.nickname ? ` (${data.nickname})` : "";
        return `${data.name} ${nickname}`;
      }
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
        return data.profile?.major || "";
      }

      case OtherProperties.Status: {
        return getStatusValue(data.profile);
      }

      case OtherProperties.Total_Course: {
        return !data.courses.length ? "0" : data.courses.length;
      }

      default:
        return "-";
    }
  };

  const handleSort = (headerId: string, key: string | undefined) => {
    let newDirection =
      sortDirection === "" || sortDirection === "desc" ? "asc" : "desc";
    if (headerId !== sortBy) newDirection = "asc";
    setSortDirection(newDirection);
    setSortBy(headerId);
    setSortDepthKey(key);
  };

  const handleRowClick = (data: ITableData): void => {
    navigate(`/${data.id}`);
  };

  return (
    <>
      <Container>
        <InputText
          className="mW-100"
          type="email"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
          disabled={loading}
        />

        <Table
          data={sort(sanitizeData)}
          headers={TableHeader}
          onSort={handleSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onRowClick={handleRowClick}
          loading={loading}
        >
          {{
            [StudentProperties.Name]: (data: ITableData) =>
              sanitizeTableData(data, StudentProperties.Name),
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
    </>
  );
};

export default Students;
