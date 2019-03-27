import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import {Provider} from "react-redux";
import "normalize.css";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import configureStore, {history} from "./common/store";
import {ConnectedRouter} from "connected-react-router";

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
