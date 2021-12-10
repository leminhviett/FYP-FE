import React from "react";
import CardGridContainer from "../components/CardGridContainer";
import Img1 from "../images/hacking1.jpeg";
import Img2 from "../images/hack2.jpeg";
import Card from "../components/Card";
import NormalizeContainer from "../components/NormalizeContainer";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const ChallengesPage = () => {
	const { path } = useRouteMatch();

	const topic = <Card imgSrc={Img1} name="topic" desc="description 1" challenge_id="123" />;
	const topic2 = <Card imgSrc={Img2} name="topic" desc="description 2" challenge_id="123" />;

	return (
		<>
			<NormalizeContainer>
				<Switch>
					<Route exact path={path}>
						<h1>Challenges</h1>
						<CardGridContainer>
							{topic}
							{topic2}
							{topic2}
							{topic2}
							{topic2}
						</CardGridContainer>
					</Route>
					<Route path={`${path}/:challengeID`}>
						<ChallengePage />
					</Route>
				</Switch>
			</NormalizeContainer>
		</>
	);
};

//for viewing detail 1 challenge
const ChallengePage = () => {
	return (
		<div>
			<h1>Challenge page</h1>
		</div>
	);
};

export default ChallengesPage;
