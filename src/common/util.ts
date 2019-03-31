// @ts-ignore
import cryptojs from "crypto-js";
import ReactDOM from "react-dom";

export const getLocationStateObject = (location: any, variable: string): any =>
    location.state ? location.state[variable] : undefined;

export const removeDuplicates = (values: string[]): string[] =>
    // @ts-ignore
    [...new Set(values)];

export const range = (amount: number): number[] =>
    // @ts-ignore
    [...new Array(amount).keys()];

export const encrypt = (value: string): string =>
    cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(value)).toString()

export const decrypt = (value: string): string => {
    try {
        return cryptojs.enc.Base64.parse(value).toString(cryptojs.enc.Utf8);
    } catch (e) {
        console.log("Error during decryption", e);
        return "error";
    }
}

export const hashAndSalt = (value: string): string =>
    encrypt(cryptojs.SHA512(value + Date.now().toString()).toString()).substring(0, 10);

export const random = (minValue: number, maxValue: number): number =>
    Math.floor((Math.random() * maxValue) + minValue);

export const showOverlay = (loadingOverlay: JSX.Element) =>
    ReactDOM.render(loadingOverlay, document.querySelector("#overlay"));

export const hideOverlay = () => {
    if (!document.querySelector("#overlay")) {
        throw new Error("Overlay not found!");
    }

    ReactDOM.unmountComponentAtNode(
        document.querySelector("#overlay") || document.createElement("DIV")
    );
}
