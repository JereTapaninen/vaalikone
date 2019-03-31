import React from "react";
import "./tosOverlay.scss";
import {hideOverlay} from "../../common/util";

// @TODO: add proper prop typing
export default () => {
    const confirm = () => {
        sessionStorage["accept_tos"] = true;
        hideOverlay();
    };

    const deny = () => {
        sessionStorage["accept_tos"] = false;
        window.location.href = "https://google.com";
    };

    return (
        <div id="tos-overlay">
            <div id="overlay-box">
                <div>
                    <h2>Vaalikoneen käyttöehdot</h2>
                </div>
                <div>
                    <p>
                        Jatkaaksesi sivulle sinun pitää hyväksyä Vaalikoneen käyttöehdot.<br />
                        <b>Emme tallenna sinun tietojasi millekään palvelimelle, emmekä jaa sitä ulkopuolisille tahoille.</b>
                    </p>
                    <a href="/eduskunta2019/tos" target="_blank" rel="noopener noreferrer">
                        Lue loput käyttöehtomme.
                    </a>
                </div>
                <div>
                    <button className="cyan-btn" onClick={confirm}>
                        Olen lukenut käyttöehdot ja hyväksyn ne.
                    </button>
                    <button className="gray-btn" onClick={deny}>
                        En hyväksy käyttöehtoja.
                    </button>
                </div>
            </div>
        </div>
    );
};
