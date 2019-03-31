import React from "react";
import "./loadingOverlay.css";
import loading from "./loading.svg";

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
