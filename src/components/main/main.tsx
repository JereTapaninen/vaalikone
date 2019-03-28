// @ts-ignore
import React, {useState} from "react";
import "./main.css";
// @ts-ignore
import citiesJSON from "cities.json";
// @ts-ignore
import {connect} from "react-redux";
import {ActionType, StartedState} from "../../common/constants";
import {actionSetStartedState} from "../../common/actions";
import {MainProps} from "../../common/types";
import {push} from "connected-react-router";
import {removeDuplicates} from "../../common/util";

const Main = (props: MainProps) => {
    const {navigate} = props;
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
        navigate("/eduskunta2019/kysymykset", {startedState: StartedState.Started});
    };

    return (
        <div id="main-container">
            <header id="main-header">
                <span id="text-title">Eduskuntavaalit 2019</span>
                <a id="logo" href="/eduskunta2019">VAALIKONE</a>
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
                                <img alt='hehe' src="shutdown.svg" width="30px" height="30px" />
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
    navigate: (url: string, state: object) => dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Main);
