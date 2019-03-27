import React from "react";
// @ts-ignore
import {connect} from "react-redux";
import {
    ResultsDispatchProps,
    ResultsProps
} from "../../common/types";
import {
    StartedState
} from "../../common/constants";
import {
    actionSetStartedState
} from "../../common/actions";
import {push} from "connected-react-router";
import {Redirect} from "react-router-dom";
import {getLocationStateObject} from "../../common/util";

const Results = (props: ResultsProps) => {
    const {location} = props;

    return getLocationStateObject(location, "startedState") === StartedState.Ended ? (
        <div>Hello world!</div>
    ) : (
        <Redirect push to="/eduskunta2019" />
    );
};

const mapDispatchToProps = (dispatch: any): ResultsDispatchProps => ({
    navigate: (url: string, state: object) =>
        dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Results);
