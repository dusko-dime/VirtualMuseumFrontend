import React from "react";
import "./App.css";
import ApplicationProvider from "./context/ApplicationContext";
import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "styled-components";
import Main from "./Main";
import { StylesProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import initializeI18N from "./i18n/init";
import breakpoints from "./theme/breakpoints";

initializeI18N();

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
    mediaQueries: {
      extraSmallScreen: `@media screen and (min-width: ${breakpoints.xs})`,
      smallScreen: `@media screen and (min-width: ${breakpoints.xs})`,
      mediumScreen: `@media screen and (min-width: ${breakpoints.md})`,
      largeScreen: `@media screen and (min-width: ${breakpoints.lg})`,
      extraLargeScreen: `@media screen and (min-width: ${breakpoints.xl})`,
    },
  });
  return (
    <StylesProvider injectFirst>
      <ApplicationProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Main />
          </ThemeProvider>
        </AuthProvider>
      </ApplicationProvider>
    </StylesProvider>
  );
};

export default App;
