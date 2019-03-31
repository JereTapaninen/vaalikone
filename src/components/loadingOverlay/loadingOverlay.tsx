import React from "react";
import ReactDOM from "react-dom";
import "./loadingOverlay.css";
import loading from "./loading.svg";

export const show = (loadingOverlay: JSX.Element) =>
    ReactDOM.render(loadingOverlay, document.querySelector("#overlay"));

export const hide = () => {
    if (!document.querySelector("#overlay")) {
        throw new Error("Overlay not found!");
    }

    ReactDOM.unmountComponentAtNode(
        document.querySelector("#overlay") || document.createElement("DIV")
    );
}

// @TODO: add proper prop typing
export default ({text}: any) => (
    <div id="loading-overlay">
        <img
            src={loading}
            alt="Ladataan..."
            width="200px"
            height="200px"
        />
        <h1>{text}</h1>
    </div>
);
