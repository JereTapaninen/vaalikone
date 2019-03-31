// @ts-ignore
import React, {useState} from "react";
import "./main.scss";
// @ts-ignore
import citiesJSON from "cities.json";
// @ts-ignore
import {connect} from "react-redux";
import {StartedState} from "../../common/constants";
import {MainProps} from "../../common/types";
import {push} from "connected-react-router";
import {
    removeDuplicates,
    random,
    range,
    showOverlay,
    hideOverlay
} from "../../common/util";
import SocialMediaLinks from "../socialMediaLinks/socialMediaLinks";
import shutdown from "./shutdown.svg";
import LoadingOverlay from "../loadingOverlay/loadingOverlay";
import TosOverlay from "../tosOverlay/tosOverlay";

const coordinateLeeway = 1.25;

const Main = (props: MainProps) => {
    const {navigate} = props;
    // @ts-ignore
    const filteredCities: object[] = citiesJSON
        .filter((cityInfo: {country: string}) => cityInfo.country === "FI");

    const getCityNames = (cities: object[]): string[] =>
        removeDuplicates(cities.map((cityInfo: any) => cityInfo.name)).sort();

    const [cities]: [string[], (arg: string[]) => void] =
        useState(getCityNames(filteredCities));
    const [quickCities, setQuickCities]: [string[], (arg: string[]) => void] =
        useState(removeDuplicates(range(6).map(_ => cities[random(0, cities.length - 1)])));
    const [currentCity, setCurrentCity]: [string, (arg: string) => void] =
        useState("");

    const cityIsNearbyToCoordinates = ({lat, lng}: any, {latitude, longitude}: any) =>
        Number(lat) < Number(latitude) + coordinateLeeway &&
        Number(lat) > Number(latitude) - coordinateLeeway &&
        Number(lng) < Number(longitude) + coordinateLeeway &&
        Number(lng) > Number(longitude) - coordinateLeeway;

    const onChange = (event: any) => {
        setCurrentCity(event.target.value);
    };

    const resetQuickCities = (coords: any) => {
        const nearbyCities = getCityNames(
            filteredCities.filter(city => cityIsNearbyToCoordinates(city, coords))
        );
        setQuickCities(
            removeDuplicates(range(6).map(_ => nearbyCities[random(0, nearbyCities.length - 1)]))
        );
    };

    const setQuickCitiesByLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                resetQuickCities(position.coords);
            });
        }
    };

    const begin = () => {
        // Fake loading screen to immerse the user
        showOverlay(<LoadingOverlay text="Ladataan vaalikonetta..." />);
        new Promise((resolve) => {
            setTimeout(function() {
                resolve();
            }, random(100, 400));
        })
            .then(() => {
                navigate(
                    "/eduskunta2019/kysymykset",
                    {startedState: StartedState.Started}
                );
            })
            .finally(() => {
                hideOverlay();
            });
    };

    const generateQuickCities = (): JSX.Element[] => 
        quickCities.map(city => (
            <p
                onClick={() => setCurrentCity(city)}
                className="fake-a"
                key={city}
            >
                {city}
            </p>
        ));

    if (sessionStorage["accept_tos"] !== "true") {
        showOverlay(<TosOverlay />);
    }

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
                                <div>
                                    <b>Tai valitse seuraavista:</b>
                                    {generateQuickCities()}
                                </div>
                                <button
                                    id="refresh-locations"
                                    className="gray-btn"
                                    onClick={setQuickCitiesByLocation}
                                >
                                    Päivitä sijaintisi mukaan
                                </button>
                            </div>
                        </div>
                        <div id="submit-form">
                            <button id="submit" className="cyan-btn" onClick={begin}>
                                <img alt="Aloita" src={shutdown} width="30px" height="30px" />
                                <span>Käynnistä vaalikone</span>
                            </button>
                        </div>
                    </div>
                </div>
                <SocialMediaLinks url={window.location.origin} />
            </main>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any): MainProps => ({
    navigate: (url: string, state: object) => dispatch(push(url, state))
});

export default connect(null, mapDispatchToProps)(Main);
