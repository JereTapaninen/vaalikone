// @ts-ignore
import React, {useState} from "react";
import "./vaalikone.scss";
// @ts-ignore
import questionsJSON from "../../questions.json";
// @ts-ignore
import {connect} from "react-redux";
import {StartedState} from "../../common/constants";
import {
    VaalikoneDispatchProps,
    VaalikoneProps,
    SelectionButtonProps
} from "../../common/types";
import {push} from "connected-react-router";
import {Redirect} from "react-router-dom";
import {
    getLocationStateObject,
    hashAndSalt,
    encrypt,
    random,
    range,
    showOverlay,
    hideOverlay
} from "../../common/util";
// @ts-ignore
import publicIp from "public-ip";
// @ts-ignore
import partiesJSON from "../../parties.json";
// @ts-ignore
import runnersJSON from "../../runners.json";
import SocialMediaLinks from "../socialMediaLinks/socialMediaLinks";
import LoadingOverlay from "../loadingOverlay/loadingOverlay";

const Vaalikone = (props: VaalikoneProps) => {
    // @ts-ignore
    const {navigate, location} = props;

    if (getLocationStateObject(location, "startedState") !== StartedState.Started) {
        return <Redirect push to="/eduskunta2019" />;
    }

    const [questions, setQuestions]: [string[], (arg: string[]) => void] =
        useState(questionsJSON);
    const [currentQuestionId, setCurrentQuestionId]: [number, (arg: number) => void] =
        useState(0);
    const [currentQuestion, setCurrentQuestion]: [string, (arg: string) => void] =
        useState(questions[0]);
    const [questionHistory, setQuestionHistory]: [number[], (arg: number[]) => void] =
        useState(questions.map(_ => -1));

    const goToNextQuestion = () => {
        const nextQuestionId = currentQuestionId + 1;

        if (nextQuestionId >= questions.length) {
            showOverlay(<LoadingOverlay text="Ladataan tuloksia..." />);
            publicIp.v4()
                .then((publicIp: string) => {
                    const hashedPublicIp =
                        hashAndSalt(publicIp);
                    const encryptedRunnerId =
                        encrypt(runnersJSON[random(0, runnersJSON.length - 1)].id.toString());
                    const encryptedPartyId =
                        encrypt(partiesJSON[random(0, partiesJSON.length - 1)].toString());
                    navigate(
                        `/eduskunta2019/suositukset/${hashedPublicIp}/${encryptedRunnerId}/${encryptedPartyId}`,
                        {startedState: StartedState.Ended}
                    );
                })
                .catch(() => {
                    // something went wrong with publicIp API,
                    // resort to default functionality
                    const hashedPublicIp =
                        hashAndSalt("default");
                    const encryptedRunnerId =
                        encrypt(runnersJSON[random(0, runnersJSON.length - 1)].id.toString());
                    const encryptedPartyId =
                        encrypt(partiesJSON[random(0, partiesJSON.length - 1)].toString());
                    navigate(
                        `/eduskunta2019/suositukset/${hashedPublicIp}/${encryptedRunnerId}/${encryptedPartyId}`,
                        {startedState: StartedState.Ended}
                    );
                })
                .finally(() => {
                    hideOverlay();
                });

            return;
        }

        setCurrentQuestionId(nextQuestionId);
        setCurrentQuestion(questions[nextQuestionId]);
    }

    const goToPreviousQuestion = () => {
        const nextQuestionId = currentQuestionId - 1;

        if (nextQuestionId <= -1) {
            return;
        }

        setCurrentQuestionId(nextQuestionId);
        setCurrentQuestion(questions[nextQuestionId]);
    }

    const selectOption = (option: number) => {
        setQuestionHistory(questionHistory.reduce((acc: number[], curr, index): number[] => [
            ...acc,
            index === currentQuestionId ? option : curr
        ], []))
        goToNextQuestion();
    };

    const btnPrevious = (
        <button className="previous" onClick={goToPreviousQuestion}>
            <span className="margin-1vw">&#60; Edellinen</span>
        </button>
    );

    const btnNext = (
        <button className="next" onClick={goToNextQuestion}>
            <span className="margin-1vw">Seuraava &#62;</span>
        </button>
    );

    const generateSelectionButtons = (): JSX.Element[] =>
        range(5).map(key =>
            <SelectionButton
                key={key}
                optionId={key}
                selectOption={selectOption}
                defaultSelected={key === questionHistory[currentQuestionId]}
            />
        );

    const firstQuestion = currentQuestionId === 0;
    const lastQuestion = currentQuestionId === questions.length;

    return (
        <div>
            <div id="vaalikone-container">
                <header id="vaalikone-header">
                    <a id="logo" href="/eduskunta2019">VAALIKONE</a>
                </header>
                <main id="vaalikone-main">
                    <div className="floating-box" id="vaalikone-floating-box">
                        <div className="floating-box-header cyan-subtitle">
                            Eduskuntavaalit 2019
                        </div>
                        <div className="floating-box-main">
                            <div id="questionSection">
                                {currentQuestion}
                            </div>
                            <div id="answerSection">
                                <div className="answerSelectorContainer">
                                    <div className="answerSelector">
                                        {generateSelectionButtons()}
                                    </div>
                                    <div className="labels">
                                        <label>Täysin<br /> eri mieltä</label>
                                        <label>En osaa sanoa</label>
                                        <label>Täysin<br /> samaa mieltä</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="floating-box-footer">
                            <div id="button-containers">
                                <div>
                                    <div>
                                        {!firstQuestion && btnPrevious}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>{currentQuestionId + 1}/{questions.length}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {!lastQuestion && btnNext}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SocialMediaLinks url={window.location.origin} />
                </main>
            </div>
        </div>
    )
};

const SelectionButton = (props: SelectionButtonProps) => (
    <button
        className={`vaalivalinta${props.defaultSelected ? " defaultselected" : ""}`}
        onClick={() => props.selectOption(props.optionId)}
    >
    </button>
);

const mapDispatchToProps = (dispatch: any): VaalikoneDispatchProps => ({
    navigate: (url: string, state: object) => dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Vaalikone);
