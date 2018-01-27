import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import MainRouter from "./routes";

// const configureStore = require("./store/configureStore");

declare var window;

// const store = configureStore();

ReactDOM.render(<Provider store={{}}>{MainRouter}</Provider>, document.getElementById("app"));

// global debug mark
window._DEBUG_ = process.env.NODE_ENV === "development";
