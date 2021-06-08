import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Template from "./Template";

const Main = () => {
    return (
        <Template>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
        </Template>
    )
}

export default Main;