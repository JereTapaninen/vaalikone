// @ts-ignore
import React, {useState} from "react";
import "./vaalikone.scss";
// @ts-ignore
import questionsJSON from "../../questions.json";
// @ts-ignore
import {connect} from "react-redux";
import {StartedState} from "../../common/constants";
import {actionSetStartedState} from "../../common/actions";
import {
    VaalikoneDispatchProps,
    VaalikoneProps,
    SelectionButtonProps
} from "../../common/types";
import {push} from "connected-react-router";
import {Redirect} from "react-router-dom";
import {getLocationStateObject} from "../../common/util";

const Vaalikone = (props: VaalikoneProps) => {
    // @ts-ignore
    const {navigate, location} = props;
    const [questions, setQuestions]: [string[], (arg: string[]) => void] = useState(questionsJSON);
    const [currentQuestionId, setCurrentQuestionId]: [number, (arg: number) => void] = useState(0);
    const [currentQuestion, setCurrentQuestion]: [string, (arg: string) => void] = useState(questions[0]);

    const goToNextQuestion = () => {
        const nextQuestionId = currentQuestionId + 1;

        if (nextQuestionId >= questions.length) {
            navigate("/eduskunta2019/suositukset", {startedState: StartedState.Ended});

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
        // @TODO: Implement selected option functionality - save answer
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

    const firstQuestion = currentQuestionId === 0;
    const lastQuestion = currentQuestionId === questions.length;

    return getLocationStateObject(location, "startedState") === StartedState.Started ? (
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
                                        <SelectionButton optionId={0} selectOption={selectOption} />
                                        <SelectionButton optionId={1} selectOption={selectOption} />
                                        <SelectionButton optionId={2} selectOption={selectOption} />
                                        <SelectionButton optionId={3} selectOption={selectOption} />
                                        <SelectionButton optionId={4} selectOption={selectOption} />
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
                </main>
            </div>
        </div>
    ) : (
        <Redirect push to="/eduskunta2019" />
    );
};

const SelectionButton = (props: SelectionButtonProps) => (
    <button
        className="vaalivalinta"
        onClick={() => props.selectOption(props.optionId)}
    >
    </button>
);

const mapDispatchToProps = (dispatch: any): VaalikoneDispatchProps => ({
    navigate: (url: string, state: object) => dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Vaalikone);
