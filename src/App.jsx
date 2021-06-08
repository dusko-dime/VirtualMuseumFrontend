import React from "react";
import './App.css';
import ApplicationProvider from "./context/ApplicationContext";
import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import Main from "./Main";

const App = () => {
  return (
      <ApplicationProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Main/>
          </ThemeProvider>
        </AuthProvider>
      </ApplicationProvider>
  );
}

export default App;
