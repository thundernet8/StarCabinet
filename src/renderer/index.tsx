import React from "react";
import ReactDOM from "react-dom";
import { Router, hashHistory, applyRouterMiddleware } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { useScroll } from "react-router-scroll";
import configureStore from "./store/configureStore";
import routes from "./routes";

declare var window;

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextRootReducer = require("./reducers").default;
        store.replaceReducer(nextRootReducer);
    });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
    </Provider>,
    document.getElementById("app")
);

// global debug mark
window._DEBUG_ = process.env.NODE_ENV === "development";
