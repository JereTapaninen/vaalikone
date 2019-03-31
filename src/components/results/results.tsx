import React from "react";
// @ts-ignore
import {connect} from "react-redux";
import {
    ResultsDispatchProps,
    ResultsProps
} from "../../common/types";
import {push} from "connected-react-router";
import {Redirect} from "react-router-dom";
import {decrypt} from "../../common/util";
// @ts-ignore
import partiesJSON from "../../parties.json";
// @ts-ignore
import runnersJSON from "../../runners.json";
import "./results.scss";
import SocialMediaLinks from "../socialMediaLinks/socialMediaLinks";

const Results = (props: ResultsProps & {match: any}) => {
    const {navigate} = props;
    const hashedIp = props.match.params.ip;
    const encryptedRunnerId = props.match.params.id;
    const encryptedParty = props.match.params.party;

    if (!hashedIp || !encryptedRunnerId || !encryptedParty) {
        return <Redirect push to="/eduskunta2019" />;
    }

    const goToVaalikone = () => {
        navigate("/eduskunta2019", {});
    };

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
                            <div id="inner-container">
                                <div>
                                    <img
                                        src={`/runners/${runner.image}`}
                                        style={{borderRadius: "50%"}}
                                        width="120px"
                                        height="120px"
                                        alt="Ehdokkaan kuva"
                                    />
                                </div>
                                <div>
                                    <div id="party-band">
                                        {party}
                                    </div>
                                    <div id="runner">
                                        {runner.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="floating-box-footer">
                            <div id="questionSection">
                                <h3>Vastausten perusteella sinulle sopivin ehdokas on {runner.name}, {party}</h3>
                                <p>Vaalikone näyttää sopivimman puolueen ja sen puolueen sopivimman ehdokkaan.</p>
                            </div>
                            <div id="answerSection">
                            </div>
                        </div>
                        <SocialMediaLinks title='Jaa tuloksesi!' text={`Tein vaalikoneen - Suositus minulle on ${party} ja ${runner.name}`} />
                    </div>
                </main>
                <footer id="results-footer">
                    <button id="return-btn" className="cyan-btn" onClick={goToVaalikone}>
                        <span>Palaa vaalikoneeseen</span>
                    </button>
                </footer>
            </div>
            <div className="prank-application-info">Aprillipila: <a target="blank" rel="noopener noreferrer" href="https://github.com/JereTapaninen/vaalikone/">https://github.com/JereTapaninen/vaalikone/</a></div>
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
