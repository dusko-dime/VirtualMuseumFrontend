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
      if (moment(decodedData.exp).isBefore(new Date())) {
        setLoggedIn(false);
        setLoggedUser(null);
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

  const state = {
    isLoggedIn,
    accessToken,
    refreshToken,
    loggedUser,
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
