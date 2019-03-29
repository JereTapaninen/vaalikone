// @ts-ignore
import React, { useState } from "react";
import "./App.scss";
import Main from "./main/main";
import Vaalikone from "./vaalikone/vaalikone";
import Results from "./results/results";
import {Route, Switch, Redirect} from "react-router-dom";
import {
    actionSetStartedState,
    actionSetCity
} from "../common/actions";
import {StartedState} from "../common/constants";

const App = () => {
    return (
        <Switch>
            <Route exact path="/eduskunta2019" component={Main} />
            <Route exact path="/eduskunta2019/kysymykset" component={Vaalikone} />
            <Route exact path="/eduskunta2019/suositukset" component={Results} />
            <Route exact path="/eduskunta2019/suositukset/:ip" component={Results} />
            <Route exact path="/eduskunta2019/suositukset/:ip/:id" component={Results} />
            <Route exact path="/eduskunta2019/suositukset/:ip/:id/:party" component={Results} />
            <Route path="/" render={() => <Redirect to="/eduskunta2019" />} />
        </Switch>
    );
};

export default App;
