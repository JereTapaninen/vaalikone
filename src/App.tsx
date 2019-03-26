// @ts-ignore
import React, {useState} from "react";
import "./App.scss";
import Main from "./main/main";
import Vaalikone from "./vaalikone/vaalikone";
// @ts-ignore
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

const App = () => {
	const [city, setCity]: [string, (arg: string) => any] = useState("");
	const [startedState, setStartedState]: [string, (arg: string) => any] = useState("no");

	const startVaalikone = (city: string) => {
		setCity(city);
		setStartedState("started");
	};

	const mainRoute = (
		<Route
			exact path='/eduskunta2019'
			render={
				(props: any) => (
					startedState === "no" ? (
						<Main
							{...props}
							startVaalikone={startVaalikone}
						/>
					): (
						<Redirect to="/eduskunta2019/kysymykset" />
					)
				)
			}
		/>
	);
	const vaalikoneRoute = (
		<Route
			path='/eduskunta2019/kysymykset'
			render={
				(props: any) => (
					startedState === "started" ? (
						<Vaalikone
							{...props}
							city={city}
							endVaalikone={() => {}}
						/>
					) : (
						<Redirect to="/eduskunta2019" />
					)
				)
			}
		/>
	);

	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => (
					<Redirect to="/eduskunta2019" />
				)} />
				{mainRoute}
				{vaalikoneRoute}
			</Switch>
		</Router>
	);
};

export default App;
