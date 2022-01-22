import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Register, Login } from "../components/Form/RegisterLogin";
import NormalizeContainer from "../components/NormalizeContainer";

const JoinningPage = () => {
	const { path } = useRouteMatch();
	console.log(`${path}/auth`);
	return (
		<>
			<NormalizeContainer>
				<Switch>
					<Route path={`${path}/register`}>
						<Register />
					</Route>
					<Route path={`${path}/auth`}>
						<Login />
					</Route>
				</Switch>
			</NormalizeContainer>
		</>
	);
};

export default JoinningPage;
