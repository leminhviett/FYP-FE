import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NormalizeContainer from "../components/NormalizeContainer";
import { Register, Login } from "../components/RegisterLogin";
const JoinningPage = () => {
	const { path } = useRouteMatch();

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
