import React, { useCallback, useEffect, useMemo } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Images from "../../../common/Images";
import Table, { useTableState } from "../../../common/Table";
import { ITableData } from "../../../common/Table/interface";
import { useGetStudentData } from "../../../common/hooks/useGetUserData";
import { CustomImage } from "../../Students/styles";
import { CourseProperties, ProfileTableHeader } from "../constants";
import useCurrencyExchange from "../../../common/hooks/useCurrencyExchange";
import { ICurrency } from "../../Currency/interface";
import styled from "@emotion/styled";
import { getStatusValue } from "../../Students/actions";

const Box = styled.div`
  display: block;
  margin: 15px 30px;
`;

const Name = styled.h4`
  text-align: center;
`;

const Profile = (): JSX.Element => {
  let { id } = useParams();
  const { student, loading } = useGetStudentData({
    id: parseInt(id!),
  });
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    setSortDepthKey,
    sort,
  } = useTableState();

  const {
    error: currencyError,
    currencyList,
    rate,
    currency,
    setSelectedCurrency,
  } = useCurrencyExchange();

  const sanitizeData = useMemo((): ITableData[] => {
    const result =
      student?.courses.reduce(function (accumulator, a) {
        accumulator[a.semester_code] = accumulator[a.semester_code] || [];
        accumulator[a.semester_code].push(a);
        return accumulator;
      }, Object.create(null)) || [];

    return Object.values(result);
  }, [student]);

  const sanitizeTableData = (
    data: ITableData,
    key: string,
    previousData?: ITableData,
  ) => {
    switch (key) {
      case CourseProperties.Semester_Code: {
        if (previousData) {
          if (previousData[key] === data[key]) {
            return "";
          }
        }

        return data[key];
      }

      case CourseProperties.Course_Fee: {
        if (data[key]) {
          console.log(rate, !currencyError);
          if (rate && !currencyError) {
            if (currency) {
              return `${currency.symbol_native}${(rate * data[key]).toFixed(
                2,
              )}`;
            }
          }
          return `$${data[key]}`;
        }
        return "";
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

  const nickname = student?.nickname ? ` (${student?.nickname})` : "";

  return (
    <Container>
      <Card body>
        <Row>
          <Col>
            <CustomImage
              fluid
              roundedCircle
              width="150px"
              height="150px"
              src={Images[student?.profile?.user_img!] || Images.default}
            />
            <Box>
              <Name>
                {student?.name} {nickname}
              </Name>
              <h6>Major: {student?.profile?.major}</h6>
              <h6>Year: {student?.profile?.year}</h6>
              <h6>Status: {getStatusValue(student?.profile)}</h6>
              <h6>
                {" "}
                Currency Type:{" "}
                <select
                  name="currency"
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  {Object.values(currencyList).map((c: ICurrency) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
                {currencyError && (
                  <span>
                    <br />
                    <br />
                    "Unsupported currency type"
                  </span>
                )}
              </h6>
            </Box>
          </Col>
          <Col xs={8}>
            <Table
              data={sort(sanitizeData.flat(2))}
              headers={ProfileTableHeader}
              onSort={handleSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              loading={loading}
            >
              {{
                [CourseProperties.Semester_Code]: (
                  data: ITableData,
                  previousData: ITableData,
                ) =>
                  sanitizeTableData(
                    data,

                    CourseProperties.Semester_Code,
                    previousData,
                  ),
                [CourseProperties.Course_Fee]: (data: ITableData) =>
                  sanitizeTableData(data, CourseProperties.Course_Fee),
              }}
            </Table>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
