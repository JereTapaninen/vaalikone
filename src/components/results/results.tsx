import React from "react";
// @ts-ignore
import {connect} from "react-redux";
import {
    ResultsDispatchProps,
    ResultsProps
} from "../../common/types";
import {push} from "connected-react-router";
import {Redirect} from "react-router-dom";
import {decrypt, getLocationStateObject} from "../../common/util";
// @ts-ignore
import partiesJSON from "../../parties.json";
// @ts-ignore
import runnersJSON from "../../runners.json";
import "./results.scss";
import SocialMediaLinks from "../socialMediaLinks/socialMediaLinks";
import {StartedState} from "../../common/constants";

const Results = (props: ResultsProps & {match: any}) => {
    const {navigate, location} = props;
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
    const comesFromVaalikone =
        getLocationStateObject(location, "startedState") === StartedState.Ended;

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
                            {
                                comesFromVaalikone ? (<div id="questionSection">
                                    <h3>Vastausten perusteella sinulle sopivin ehdokas on {runner.name}, {party}</h3>
                                </div>) : (<div id="questionSection">
                                    <h3>Vastausten perusteella kaverisi sopivin ehdokas oli {runner.name}, {party}</h3>,
                                    <a href="/eduskunta2019/">Löydä oma ehdokkaasi!</a>
                                </div>)
                            }
                            <div id="answerSection">
                            </div>
                        </div>
                        {
                            comesFromVaalikone &&
                                <SocialMediaLinks
                                    title="Jaa tuloksesi!"
                                    text={`Tein vaalikoneen - Suositus minulle on ${party} ja ${runner.name}`}
                                />
                        }
                    </div>
                </main>
                <footer id="results-footer">
                    <button id="return-btn" className="cyan-btn" onClick={goToVaalikone}>
                        <span>{comesFromVaalikone ? "Palaa vaalikoneeseen" : "Aloita vaalikone!"}</span>
                    </button>
                </footer>
            </div>
            <div className="prank-application-info">
                Vaalikone on pila-applikaatio, joka luo satunnaisesti ehdokkaan ja puolueen.<br />
                <small><a href="https://github.com/JereTapaninen/vaalikone">Tsekkaa Vaalikoneen GitHub!</a></small>
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
