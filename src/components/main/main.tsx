// @ts-ignore
import React, {useState} from "react";
import "./main.css";
// @ts-ignore
import citiesJSON from "cities.json";
// @ts-ignore
import {connect} from "react-redux";
import {StartedState} from "../../common/constants";
import {MainProps} from "../../common/types";
import {push} from "connected-react-router";
import {removeDuplicates, random, range} from "../../common/util";

const Main = (props: MainProps) => {
    const {navigate} = props;
    // @ts-ignore
    const cityNames: string[] = citiesJSON
        .filter((cityInfo: {country: string}) => cityInfo.country === "FI")
        .map((cityInfo: {name: string}) => cityInfo.name);

    const filteredCities = removeDuplicates(cityNames).sort();

    const [cities]: [string[], (arg: string[]) => void] = useState(filteredCities);
    const [quickCities]: [string[], (arg: string[]) => void] = useState(
        range(6).map(_ => cities[random(0, cities.length - 1)])
    );
    const [currentCity, setCurrentCity]: [string, (arg: string) => void] = useState("");

    const onChange = (event: any) => {
        setCurrentCity(event.target.value);
    };

    const begin = () => {
        navigate("/eduskunta2019/kysymykset", {startedState: StartedState.Started});
    };

    const generateQuickCities = (): JSX.Element[] => 
        quickCities.map(city => (
            <p
                onClick={() => setCurrentCity(city)}
                className="fake-a"
            >
                {city}
            </p>
        ));

    return (
        <div id="main-container">
            <header id="main-header">
                <span id="text-title">Eduskuntavaalit 2019</span>
                <a id="logo" href="/eduskunta2019">VAALIKONE</a>
            </header>
            <main id="main-main">
                <div className="floating-box" id="main-floating-box">
                    <div className="floating-box-header">
                        Löydä sinulle sopiva ehdokas
                    </div>
                    <div className="floating-box-main">
                        <div className="floating-box-main-container">
                            <h3 id="begin-subtitle">Aloita valitsemalla kuntasi</h3>
                            <input
                                onChange={onChange}
                                value={currentCity}
                                placeholder="Hae kuntaa"
                                id="input-city"
                                type="text"
                                name="example"
                                list="exampleList"
                            />
                            <datalist id="exampleList">
                                {cities.map(city => <option key={city} value={city} />)}
                            </datalist>
                            <div id="pickfromlist">
                                <b>Tai valitse listasta:</b>
                                {generateQuickCities()}
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

const ListItem = (city: any, setCurrentCity: any): JSX.Element =>
    <p onClick={() => setCurrentCity(city)} className="fake-a">{city}</p>;

const mapDispatchToProps = (dispatch: any): MainProps => ({
    navigate: (url: string, state: object) => dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Main);
