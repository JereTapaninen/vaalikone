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
            <img alt='asd' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOHB4IiBoZWlnaHQ9IjEzcHgiIHZpZXdCb3g9IjAgMCA4IDEzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgNTIuNiAoNjc0OTEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkM0NEM2MzY2LTY0NjktNEI1Ny04NEQ0LUM1MTI5QUIwNzAxODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgICAgICA8ZyBpZD0iUHJldmlvdXMtYnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwgLTEuMDAwMDAwKSIgc3Ryb2tlPSIjNDE5NkE0IiBzdHJva2Utd2lkdGg9IjEuMzUzNzUiPgogICAgICAgICAgICA8ZyBpZD0iQXJyb3ctbGVmdCI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNS40NDk1NDEyOCwxMi45MTgzMzMzIEwtNS42ODQzNDE4OWUtMTQsNy40NDk4NDE5NSBMNS40NDk1NDEyOCwxLjg3ODMzMzMzIEMxLjgxNjUxMzc2LDUuNTkyNjcyNDEgLTUuNjg0MzQxODllLTE0LDcuNDMyNjcyNDEgLTUuNjg0MzQxODllLTE0LDcuMzk4MzMzMzMgQy01LjY4NDM0MTg5ZS0xNCw3LjM2Mzk5NDI1IDEuODE2NTEzNzYsOS4yMDM5OTQyNSA1LjQ0OTU0MTI4LDEyLjkxODMzMzMgWiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" />
            <span className="margin-1vw">Edellinen</span>
        </button>
    );

    const btnNext = (
        <button className="next" onClick={goToNextQuestion}>
            <span className="margin-1vw">Seuraava</span>
            <img alt='foobar' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjEzIiB2aWV3Qm94PSIwIDAgOCAxMyI+CiAgICA8cGF0aCBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzQxOTZBNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuMzU0IiBkPSJNMS41NjUuNzkxbDUuNTIgNS4zOTctNS41MiA1LjQ5N2MzLjY4LTMuNjY1IDUuNTItNS40OCA1LjUyLTUuNDQ3IDAgLjAzNC0xLjg0LTEuNzgxLTUuNTItNS40NDd6Ii8+Cjwvc3ZnPgo=" />
        </button>
    );

    const firstQuestion = currentQuestionId === 0;
    const lastQuestion = currentQuestionId === questions.length;

    return getLocationStateObject(location, "startedState") === StartedState.Started ? (
        <div>
            <div id="vaalikone-container">
                <header id="vaalikone-header">
                    <div id="logo"></div>
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
