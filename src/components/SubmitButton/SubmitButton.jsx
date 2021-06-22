import styled from "styled-components";
import { Button } from "@material-ui/core";

const SubmitButton = styled(Button)`
  background-color: green;
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

export default SubmitButton;
