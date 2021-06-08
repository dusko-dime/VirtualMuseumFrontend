import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { supportedLanguages } from "../i18n/init";
import i18n from "i18next";

const defaultState = {
    language: null,
    isLoading: null,
    error: null,
};

const defaultActions = {
    setLanguage: () => {},
    changeLanguage: () => {},
    setLoading: () => {},
    showError: () => {},
};

export const ApplicationContext = React.createContext({
    ...defaultState,
    ...defaultActions,
});

export const ApplicationConsumer = ApplicationContext.Consumer;

const ApplicationProvider = (props) => {
    const [language, setLanguage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const language = localStorage.getItem("language");
        if (supportedLanguages.includes(language)) setLanguage(language);
        else {
            setLanguage("en");
            localStorage.setItem("language", "en");
        }
    }, []);

    const changeLanguage = async (language) => {
        if (supportedLanguages.includes(language)) {
            setLanguage(language);
            localStorage.setItem("language", language);
            await i18n.changeLanguage(language);
        }
    };

    const showError = (error) => {
        //TODO prepare error object for displaying in global error boundary component
        setError(error);
    };

    const state = {
        isLoading,
        language,
        error,
        setLanguage,
        setLoading,
        changeLanguage,
        showError,
    };

    return (
        <ApplicationContext.Provider value={state}>
            {props.children}
        </ApplicationContext.Provider>
    );
};

ApplicationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useApplicationStateValue = () =>
    React.useContext(ApplicationContext);

export default ApplicationProvider;
