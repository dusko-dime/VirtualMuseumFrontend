import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const DTextField = styled(TextField)`

  max-width: 200px;
  margin-top: 10px;

  input {
    font-size: 14px;
  }
  
   ${props => props.theme.breakpoints.up("md")} {
    font-size: 55px;
    max-width: 400px;
    
   input {
      font-size: 22px;
    }
   }
`;

export default DTextField;