import styled from "styled-components";
import { Button } from "@material-ui/core";

const BasicButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  margin-top: 10px;
  color: #fff;
  height: 40px;

  :hover {
    border: 1px solid green;
    color: green;
  }

  :disabled {
    background-color: gray;
    color: black;
  }
`;

export default BasicButton;
