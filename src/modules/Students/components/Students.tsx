import React, { useMemo } from "react";
import Images from "../../../common/Images";
import Table, { useTableState } from "../../../common/Table";
import { ITableData } from "../../../common/Table/interface";

import { OtherProperties, StudentProperties, TableHeader } from "../constants";
import { useGetStudentData } from "../../../common/hooks/useGetUserData";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomImage, InputText } from "../styles";
import { getStatusValue } from "../actions";

const Students = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    setSortDepthKey,
    sort,
  } = useTableState();
  const { data, loading, setFilter } = useGetStudentData();

  const sanitizeData = useMemo(
    (): ITableData[] =>
      data.map((student) => {
        const newStudent: ITableData = {
          ...(student as unknown as ITableData),
        };

        newStudent.profile_picture = `${newStudent.profile?.user_img}`;

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
  );
};

export default Students;
