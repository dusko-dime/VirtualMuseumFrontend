import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";

const SubmitButton = styled(Button)`
  background-color: green;
  margin-top: 10px;
  color: #FFF;
  height: 40px;
  
  :hover {
    border: 1px solid green;
    color: green;
  }
`;

export default SubmitButton;