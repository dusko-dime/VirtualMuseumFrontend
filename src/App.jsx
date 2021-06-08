import React from "react";
import './App.css';
import ApplicationProvider from "./context/ApplicationContext";
import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "styled-components";
import Main from "./Main";
import { StylesProvider } from '@material-ui/core/styles';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import initializeI18N from "./i18n/init";

initializeI18N();

const App = () => {

    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });
  return (
      <StylesProvider injectFirst>
          <ApplicationProvider>
            <AuthProvider>
                <MuiThemeProvider theme={theme}>
                  <ThemeProvider theme={theme}>
                    <Main/>
                  </ThemeProvider>
                </MuiThemeProvider>
            </AuthProvider>
          </ApplicationProvider>
      </StylesProvider>
  );
}

export default App;
