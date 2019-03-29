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
import {decrypt} from "../../common/util";
// @ts-ignore
import partiesJSON from "../../parties.json";
// @ts-ignore
import runnersJSON from "../../runners.json";

const Results = (props: ResultsProps & {match: any}) => {
    const {location} = props;
    const hashedIp = props.match.params.ip;
    const encryptedRunnerId = props.match.params.id;
    const encryptedParty = props.match.params.party;

    if (!hashedIp || !encryptedRunnerId || !encryptedParty) {
        return <Redirect push to="/eduskunta2019" />;
    }

    const runnerId = Number(decrypt(encryptedRunnerId));
    const runner: any = runnersJSON.find((runner: any) => runner.id === runnerId);
    const party = decrypt(encryptedParty);

    const dataIsValid = runner !== undefined && partiesJSON.includes(party);

    return dataIsValid ? (
        <div>
            <div id="results-container">
                <header id="results-header">
                    <a id="logo" href="/eduskunta2019">VAALIKONE</a>
                </header>
                <main id="results-main">
                    <div className="floating-box" id="results-floating-box">
                        <div className="floating-box-header cyan-subtitle">
                            Eduskuntavaalit 2019
                        </div>
                        <div className="floating-box-main">
                            <div id="questionSection">
                                <h3>Vastausten perusteella sinulle sopivin puolue on {party}</h3>
                                <p>Vaalikone näyttää sopivimman puolueen ja sen puolueen sopivimman ehdokkaan.</p>
                            </div>
                            <div id="answerSection">
                            </div>
                        </div>
                        <div className="floating-box-footer">
                            <div id="party-band">
                                {party}
                            </div>
                            <div id="runner">
                                <img src={`/runners/${runner.image}`} style={{borderRadius: "50%"}} width="100px" height="100px"/>
                                {runner.name}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    ) : (
        <Redirect push to="/eduskunta2019" />
    );
};

const mapDispatchToProps = (dispatch: any): ResultsDispatchProps => ({
    navigate: (url: string, state: object) =>
        dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Results);
