import React from "react";
import {
  AppBar,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {useAuthStateValue} from "./context/AuthContext";

const Template = ({ children }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const {logout} = useAuthStateValue();

  // const openRegisterPage = () => {
  //   history.push("/register");
  // };
  //
  // const openLoginPage = () => {
  //   history.push("/login");
  // };

  const logoutHandler = () => {
    logout();
    history.push("/");
  }

  return (
    <div>
      <AppBar position="sticky">
        {/*<Toolbar>*/}
        <Grid container>
          <Grid container xs={3} direction="row" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">{t("app.title")}</Typography>
          </Grid>
          <Grid
            container
            xs={9}
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={2}
          >
            <Grid item>
              <LogoutButton onClick={logoutHandler}>
                {t("header.logout")}
              </LogoutButton>
            </Grid>
            {/*<Grid item>*/}
            {/*  <RegisterButton onClick={openRegisterPage}>*/}
            {/*    {t("header.register")}*/}
            {/*  </RegisterButton>*/}
            {/*</Grid>*/}
            {/*<Grid item>*/}
            {/*  <LoginButton onClick={openLoginPage}>*/}
            {/*    {t("header.login")}*/}
            {/*  </LoginButton>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
        {/*</Toolbar>*/}
      </AppBar>
      {children}
    </div>
  );
};

// const LoginButton = styled(Button)`
//   background-color: #fff;
//   color: #000;
//   :hover {
//     background-color: #226a3a;
//     color: #fff;
//   }
// `;
//
// const RegisterButton = styled(Button)`
//   background-color: #fff;
//   color: #000;
//   :hover {
//     background-color: gray;
//     color: #fff;
//   }
// `;

const LogoutButton = styled(Button)`
  background-color: #fff;
  color: #000;
  :hover {
    background-color: gray;
    color: #fff;
  }
`;

Template.propTypes = {
  children: PropTypes.element,
};

export default Template;
