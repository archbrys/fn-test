import styled from "@emotion/styled";
import Image from "react-bootstrap/Image";

export const CustomImage = styled(Image)`
  width: ${(props) => props.width || "50px"};
  height: ${(props) => props.height || "50px"};
  object-fit: cover;
`;
