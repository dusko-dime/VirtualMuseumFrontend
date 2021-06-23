import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Template from "./Template";
import { useApplicationStateValue } from "./context/ApplicationContext";
import { useAuthStateValue } from "./context/AuthContext";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import HomeGuest from "./pages/HomeGuest";

const Main = () => {
  const { isLoading } = useApplicationStateValue();
  const { isLoggedIn } = useAuthStateValue();

  if (isLoading) return null;

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <Template>
          <Switch>
            <Route path="/home" component={HomeLoggedIn}></Route>
            <Route component={HomeLoggedIn} />
          </Switch>
        </Template>
      )}
      {!isLoggedIn && (
        <Switch>
          <Route exact path="/" component={HomeGuest} />
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={NotFound} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Main;
