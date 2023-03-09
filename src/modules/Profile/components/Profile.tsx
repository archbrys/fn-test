import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Images from "../../../common/Images";
import { useGetStudentData } from "../../Students/hooks/useGetUserData";
import { CustomImage } from "../../Students/styles";
const Profile = (): JSX.Element => {
  let { id } = useParams();
  const { student, loading, getStatusValue } = useGetStudentData({
    id: parseInt(id!),
  });

  console.log(student, loading);

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
              src={Images[student?.profiles[0]?.user_id!] || Images.default}
            />
            <h6>Name: {student?.name}</h6>
            <h6>Major: {student?.profiles[0]?.major}</h6>
            <h6>Year: {student?.profiles[0]?.year}</h6>
            <h6>Status: {getStatusValue(student?.profiles)}</h6>
          </Col>
          <Col xs={8}>2 of 2</Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
