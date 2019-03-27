// @ts-ignore
import React, { useState } from "react";
import "./App.scss";
import Main from "./main/main";
import Vaalikone from "./vaalikone/vaalikone";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// @ts-ignore
import {connect} from "react-redux";
import {
    actionSetStartedState,
    actionSetCity
} from "../common/actions";
import {StartedState} from "../common/constants";
import {
    AppStateProps,
    AppDispatchProps,
    AppProps
} from "../common/types";

const App = (props: AppProps) => {
    const {
        startedState, setStartedState,
        city, setCity
    } = props;

    const startVaalikone = (city: string) => {
        setCity(city);
        setStartedState(StartedState.Started);
    };

    const mainRoute = (
        <Route
            exact
            path="/eduskunta2019"
            render={(props: any) =>
                startedState === "no" ? (
                    <Main {...props} startVaalikone={startVaalikone} />
                ) : (
                    <Redirect to="/eduskunta2019/kysymykset" />
                )
            }
        />
    );
    const vaalikoneRoute = (
        <Route
            path="/eduskunta2019/kysymykset"
            render={(props: any) =>
                startedState === "started" ? (
                    <Vaalikone {...props} city={city} endVaalikone={() => {}} />
                ) : (
                    <Redirect to="/eduskunta2019" />
                )
            }
        />
    );

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/eduskunta2019" />} />
                {mainRoute}
                {vaalikoneRoute}
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: any): AppStateProps => ({
    startedState: state.startedState,
    city: state.city
});

const mapDispatchToProps = (dispatch: any): AppDispatchProps => ({
    setStartedState: (startedState: string) => dispatch(actionSetStartedState(startedState)),
    setCity: (city: string) => dispatch(actionSetCity(city))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
