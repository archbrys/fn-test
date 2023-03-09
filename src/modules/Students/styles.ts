import styled from "@emotion/styled";
import { Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export const CustomImage = styled(Image)`
  width: ${(props) => props.width || "50px"};
  height: ${(props) => props.height || "50px"};
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;

export const InputText = styled(Form.Control)`
  width: 300px;
  margin-bottom: 20px;
`;
