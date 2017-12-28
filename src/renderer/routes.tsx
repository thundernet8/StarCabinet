import React from "react";
import { IndexRoute, Route } from "react-router";

/* containers */
import App from "./containers/app";
import MainPage from "./containers/mainPage";
import LoginPage from "./containers/loginPage";
import SettingPage from "./containers/settingPage";

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/" component={MainPage} />
        {/* <Redirect from='*' to='/404'/> */}
        <Route path="/login" component={LoginPage} />
        <Route path="/setting" component={SettingPage} />
    </Route>
);

export default routes;
