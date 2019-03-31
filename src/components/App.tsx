// @ts-ignore
import React from "react";
import "./App.scss";
import Main from "./main/main";
import Vaalikone from "./vaalikone/vaalikone";
import Results from "./results/results";
import ToS from "./tos/tos";
import {Route, Switch, Redirect} from "react-router-dom";
import { Helmet } from 'react-helmet';

export default () => (
    <>
        <Switch>
            <Route exact path="/eduskunta2019" component={Main} />
            <Route exact path="/eduskunta2019/kysymykset" component={Vaalikone} />
            <Route exact path="/eduskunta2019/suositukset" component={Results} />
            <Route exact path="/eduskunta2019/suositukset/:ip" component={Results} />
            <Route exact path="/eduskunta2019/suositukset/:ip/:id" component={Results} />
            <Route exact path="/eduskunta2019/suositukset/:ip/:id/:party" component={Results} />
            <Route exact path="/eduskunta2019/tos" component={ToS} />
            <Route path="/" render={() => <Redirect to="/eduskunta2019" />} />
        </Switch>
        <Helmet>
            <title>Vaalikone - Eduskuntavaalit 2019</title>
        </Helmet>
    </>
);
