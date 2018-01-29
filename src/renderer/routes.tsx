import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

/* Entries */
import App from "./entries/Index";
import MainPage from "./entries/Main";
import LoginPage from "./entries/Login";
import SettingPage from "./entries/Setting";
import NotFoundPage from "./entries/NotFound";

const MainRouter = (
    <Router>
        <Route
            exact={false}
            path="/"
            render={props => (
                <App {...props}>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/setting" component={SettingPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </App>
            )}
        />
    </Router>
);

export default MainRouter;
