import React from "react";
import { useEffect, useContext, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import CardGridContainer from "../components/CardGridContainer";
import Card from "../components/Card";
import NormalizeContainer from "../components/NormalizeContainer";
import GlobalContext from "../context/Context";
import ActionBtn from "../components/ActionBtn";
import { Container, ViewContainer } from "../components/ToggleView/components";
import { fetchChallenge } from "../context/action";
import Challenge from "../components/DetailView/Challenge";

import { api } from "../App";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const ChallengesPage = () => {
	const { path } = useRouteMatch();
	const [state, dispatch] = useContext(GlobalContext);
	const [page_no, set_page_no] = useState(1);
	const [content, set_content] = useState([]);

	const challenges = async () => {
		var content;

		if (state.challenges.has(page_no)) {
			content = state.challenges.get(page_no);
			console.log("content locally");
			set_content(content);
			return;
		}

		await api.get(`/challenges/${page_no}`).then((response) => {
			var challenges = JSON.parse(response.data.payload);
			dispatch(fetchChallenge({ page: page_no, content: challenges }));

			content = challenges;
			console.log("content remotely");
			console.log(content);
			set_content(content);
		});
	};

	useEffect(challenges, [page_no]);

	return (
		<>
			<NormalizeContainer>
				<Switch>
					<Route exact path={path}>
						<h1>Challenges</h1>

						<CardGridContainer>
							{content.map((ele) => {
								ele.id = ele._id["$oid"];

								return (
									<Card
										name={ele.challenge_name}
										desc={ele.challenge_desc}
										imgSrc={`${BASE_URL}/${ele.img_loc}`}
										key={ele.id}
										path={`${path}/${page_no}/${ele.id}`}
										card_action="Hack it"
									/>
								);
							})}
						</CardGridContainer>

						{/* switch page */}
						<Container>
							<ViewContainer>
								<ActionBtn
									onClick={() => {
										set_page_no(page_no - 1);
									}}
									disabled={page_no == 1}
								>
									Prev
								</ActionBtn>
							</ViewContainer>
							<ViewContainer>
								<h3>Page {page_no}</h3>
							</ViewContainer>
							<ViewContainer>
								<ActionBtn
									onClick={() => {
										set_page_no(page_no + 1);
									}}
									disabled={content.length == 0}
								>
									Next
								</ActionBtn>
							</ViewContainer>
						</Container>
					</Route>

					<Route path={`${path}/:page_no/:challengeID`}>
						<Challenge />
					</Route>
				</Switch>
			</NormalizeContainer>
		</>
	);
};
export default ChallengesPage;
