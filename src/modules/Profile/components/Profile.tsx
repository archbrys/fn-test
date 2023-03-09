import React, { useCallback, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Images from "../../../common/Images";
import Table, { useTableState } from "../../../common/Table";
import { ITableData } from "../../../common/Table/interface";
import { useGetStudentData } from "../../Students/hooks/useGetUserData";
import { CustomImage } from "../../Students/styles";
import { CourseProperties, ProfileTableHeader } from "../constants";
const Profile = (): JSX.Element => {
  let { id } = useParams();
  const { student, loading, getStatusValue } = useGetStudentData({
    id: parseInt(id!),
  });
  const { sortBy, setSortBy, sortDirection, setSortDirection } =
    useTableState();

  const groupCrouse = useCallback((): ITableData[] => {
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
    previousData: ITableData,
    key: string,
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

      default:
        return "-";
    }
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
              src={Images[student?.profile?.user_id!] || Images.default}
            />
            <h6>
              Name: {student?.name} {nickname}
            </h6>
            <h6>Major: {student?.profile?.major}</h6>
            <h6>Year: {student?.profile?.year}</h6>
            <h6>Status: {getStatusValue(student?.profile)}</h6>
          </Col>
          <Col xs={8}>
            <Table
              data={groupCrouse()}
              headers={ProfileTableHeader}
              onSort={() => null}
              sortBy={sortBy}
              sortDirection={sortDirection}
            >
              {{
                [CourseProperties.Semester_Code]: (
                  data: ITableData,
                  previousData: ITableData,
                ) =>
                  sanitizeTableData(
                    data,
                    previousData,
                    CourseProperties.Semester_Code,
                  ),
              }}
            </Table>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
