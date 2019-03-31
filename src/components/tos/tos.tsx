import React from "react";
import "./tos.scss";

export default () => (
    <div>
        <div id="tos-container">
            <header id="tos-header">
                <a id="logo" href="/eduskunta2019">VAALIKONE</a>
            </header>
            <main id="tos-main">
                <div className="floating-box" id="tos-floating-box">
                    <div className="floating-box-main">
                        <div>
                            <h3>Terms of Service of Vaalikone</h3>
                            <p>Vaalikone is a joke web application that generates parliamentary election runner and political party combinations on a completely random way.</p>
                            <p>Vaalikone does not use your personal data/answers to questions to generate runner and political party combinations.</p>
                            <p>Vaalikone does not store your personal data anywhere, at any point now or in the future.</p>
                            <p>Vaalikone gets your public IPv4 address to generate a random results URL for you, <b>but Vaalikone hashes and salts that IPv4 address, then turns it into Base64 and then trims it down to 10 characters.</b> It is impossible to get your IPv4 address back from the resulting URL. Vaalikone does not store your IPv4 address anywhere.</p>
                            <br />
                            <p><b>By using Vaalikone, you agree and are fine with the following points:</b></p>
                            <ul>
                                <li>Vaalikone gets your public IPv4 only to generate a random URL</li>
                                <li>Vaalikone does not store your personal data.</li>
                                <li>Vaalikone does not offer your personal data to third parties</li>
                                <li>Vaalikone generates the parliamentary election runner and political party combinations randomly, and <b>therefore we are not liable for any politically sensitive randomly generated combinations.</b></li>
                                <li>The joke questions asked from you are not meant to swing one political way or the other; they are completely neutral and are meant as jokes, and we are not held liable if you feel offended by them.</li>
                            </ul>
                            <br />
                            <a href="/eduskunta2019/">Go back to the main page</a>
                        </div>
                    </div>
                </div>
            </main>
            <footer id="tos-footer">
            </footer>
        </div>
    </div>
);
