// @ts-ignore
import React, {useState} from "react";
import "./main.css";
// @ts-ignore
import citiesJSON from "cities.json";
// @ts-ignore
import {connect} from "react-redux";
import {StartedState} from "../../common/constants";
import {actionSetStartedState} from "../../common/actions";
import {MainProps} from "../../common/types";

const removeDuplicates = (values: string[]) =>
    // @ts-ignore
    [...new Set(values)];

const Main = (props: MainProps) => {
    const {setStartedState} = props;
    // @ts-ignore
    const cityNames: string[] = citiesJSON
        .filter((cityInfo: {country: string}) => cityInfo.country === "FI")
        .map((cityInfo: {name: string}) => cityInfo.name);

    const filteredCities = removeDuplicates(cityNames).sort();

    const [cities, setCities]: [string[], (arg: string[]) => void] = useState(filteredCities);
    const [currentCity, setCurrentCity]: [string, (arg: string) => void] = useState("");

    const onChange = (event: any) => {
        setCurrentCity(event.target.value);
    };

    const begin = () => {
        setStartedState(StartedState.Started)
    };

    return (
        <div id="main-container">
            <header id="main-header">
                <span id="text-title">Eduskuntavaalit 2019</span>
                <div id="logo"></div>
            </header>
            <main id="main-main">
                <div className="floating-box" id="main-floating-box">
                    <div className="floating-box-header">
                        Löydä sinulle sopiva puolue ja ehdokas
                    </div>
                    <div className="floating-box-main">
                        <div className="floating-box-main-container">
                            <h3 id="begin-subtitle">Aloita valitsemalla vaalipiirisi</h3>
                            <input onChange={onChange} value={currentCity} placeholder="Hae vaalipiiriä tai kuntaa" id="input-city" type="text" name="example" list="exampleList" />
                            <datalist id="exampleList">
                                {cities.map(city => <option key={city} value={city} />)}
                            </datalist>
                            <div id="pickfromlist">
                                <b>Tai valitse listasta:</b>
                                <p onClick={() => setCurrentCity("Espoo")} className="fake-a">Espoo</p>
                                <p onClick={() => setCurrentCity("Helsinki")} className="fake-a">Helsinki</p>
                                <p onClick={() => setCurrentCity("Kauniainen")} className="fake-a">Kauniainen</p>
                                <p onClick={() => setCurrentCity("Tampere")} className="fake-a">Tampere</p>
                                <p onClick={() => setCurrentCity("Turku")} className="fake-a">Turku</p>
                                <p onClick={() => setCurrentCity("Vantaa")} className="fake-a">Vantaa</p>
                            </div>
                        </div>
                        <div id="submit-form">
                            <button id="submit" onClick={begin}>
                                <img alt='hehe' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDE5IDE5Ij4KICAgIDxnIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgOS42ODNjLS4wMDYtMi42NDUuODQtNC44MTkgMi41ODUtNi42MzguMTk5LS4yMDcuNDI2LS4zODcuNjQtLjU4LjYzNS0uNTcxIDEuODA4LS40MDIgMi4zMDQuMjIuNTk4Ljc0OS41MzYgMS43Mi0uMTU5IDIuMzYtLjY3OC42MjQtMS4yMzEgMS4zNDYtMS41NjYgMi4yMS0uOTEgMi4zNDgtLjQ3NCA1LjIxMiAxLjkyMiA3LjEwMiAxLjMyMiAxLjA0MyAyLjgyOCAxLjM4OCA0LjQ5IDEuMjUgMi40ODctLjIwOSA0Ljg5OS0yLjM0OCA1LjMxNi00Ljg5NC4zNjktMi4yNDUtLjIzNS00LjE3OC0xLjk2NC01LjcyMy0uNTI0LS40NjktLjc1My0xLjA1NC0uNTU5LTEuNzM2LjE4Ni0uNjUxLjYyNS0xLjA4NyAxLjMxNC0xLjIyLjQ4NC0uMDkzLjkzNC4wMDIgMS4zMTkuMzIgMS4zNjEgMS4xMjMgMi4zNCAyLjUxIDIuODk5IDQuMTguNDI0IDEuMjcuNTE2IDIuNTc0LjQzIDMuOTA1LS4yNyA0LjE0NS0zLjcxIDcuNTU4LTcuMjQ1IDguMzE1QzYuMjA3IDE5LjkzNiAxLjg2OCAxNi42OS40NTcgMTIuNTUxQTguNzcgOC43NyAwIDAgMSAwIDkuNjgzIi8+CiAgICAgICAgPHBhdGggZD0iTTguMDAzIDEuNjRjMC0uNjk2LjM5OS0xLjMzNyAxLjAwMy0xLjU0NyAxLjE0Mi0uMzk2IDEuOTkuNTQzIDEuOTkxIDEuNDguMDAzIDMuMjgyLjAwNSA2LjU2NCAwIDkuODQ3LS4wMDIuODk0LS42NTUgMS41ODEtMS40NyAxLjU4LS44NTQtLjAwMS0xLjUxOS0uNjg2LTEuNTIzLTEuNTkzLS4wMDgtMS42MzgtLjAwMi0zLjI3Ni0uMDAyLTQuOTE0IDAtMS42MTctLjAwMi0zLjIzNSAwLTQuODUzeiIvPgogICAgPC9nPgo8L3N2Zz4K" />
                                <span>Käynnistä vaalikone</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any): MainProps => ({
    setStartedState: (startedState: string) => dispatch(actionSetStartedState(startedState))
});

export default connect(null, mapDispatchToProps)(Main);
