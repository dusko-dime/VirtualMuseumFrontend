import React, { useState } from "react";
import PropTypes from "prop-types";
import { useApplicationStateValue } from "./ApplicationContext";

const defaultState = {
    isLoggedIn: null,
    accessToken: null,
    refreshToken: null,
    loggedUser: null,
};

const defaultActions = {
    login: () => {},
    logout: () => {},
    setLoggedIn: () => {},
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
        usergroup: null,
        username: null,
        id: null,
    });
    const { setLoading } = useApplicationStateValue();

    const login = async ({ username, password }) => {
        // TODO Login
    };

    const logout = async () => {
        // TODO Logout
    };

    const state = {
        isLoggedIn,
        accessToken,
        refreshToken,
        loggedUser,
        setLoggedIn,
        login,
        logout,
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
