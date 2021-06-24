import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useApplicationStateValue } from "./ApplicationContext";
import JwtDecode from "jwt-decode";
import moment from "moment";

const defaultState = {
  isLoggedIn: null,
  accessToken: null,
  refreshToken: null,
  loggedUser: null,
};

const defaultActions = {
  setLoggedIn: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setLoggedUser: () => {},
  logout: () => {}
};

export const AuthContext = React.createContext({
  ...defaultState,
  ...defaultActions,
});

export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState({
    firstName: null,
    lastName: null,
    username: null,
    id: null,
  });
  const { setLoading } = useApplicationStateValue();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setLoading(true);
    if (accessToken) {
      const decodedData = JwtDecode(accessToken);
      if (moment(decodedData.exp*1000).isBefore(new Date())) {
        // TODO UNCOMMENT - FOR TESTING ONLY
        // setLoggedIn(false);
        // setLoggedUser(null);
        setLoggedIn(true);
        setLoggedUser({});
      } else {
        setLoggedIn(true);
        setLoggedUser({
          firstName: decodedData.first_name,
          lastName: decodedData.last_name,
          username: decodedData.username,
          id: decodedData.id,
        });
      }
      setLoading(false);
    } else {
      //window.location.href = "/login";
      setLoggedIn(false);
      setLoggedUser(null);
      setLoading(false);
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  const state = {
    isLoggedIn,
    accessToken,
    refreshToken,
    loggedUser,
    logout,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setLoggedUser
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuthStateValue = () => React.useContext(AuthContext);

export default AuthProvider;
