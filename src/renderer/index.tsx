import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import MainRouter from "./routes";
import getStore from "./store";

require("./assets/styles/global/global.less");

declare var window;

const store = getStore();

ReactDOM.render(<Provider store={store}>{MainRouter}</Provider>, document.getElementById("app"));

// global debug mark
window._DEBUG_ = process.env.NODE_ENV === "development";
