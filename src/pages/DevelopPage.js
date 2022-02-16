import React, { useEffect, useState } from "react";
import ToggleView from "../components/ToggleView";
import { checkValidToken } from "../utils";
import JoinningPage from "./JoinningPage";
import { useHistory, useLocation, Route, Switch, useRouteMatch } from "react-router-dom";
import { RoutingBtn } from "../components/RoutingBtn";
import NormalizeContainer from "../components/NormalizeContainer";
import Card from "../components/Card";
import CardGridContainer from "../components/CardGridContainer";
import { api } from "../App";
import Challenge from "../components/DetailView/Challenge";
import ActionBtn from "../components/ActionBtn";
import { AddTaskChallenge } from "../components/Form/MyDevComp";
import { SplitContainer } from "../components/Form/MyDevComp/components";
import TopicDev from "../components/DetailView/TopicDev";

const DevelopPage = () => {
	const BASE_URL = process.env.REACT_APP_SERVER_URL;
	const [topics, setTopics] = useState([]);
	const [challenges, setChallenges] = useState([]);
	const { path } = useRouteMatch();

	const history = useHistory();

	useEffect(() => {
		api.get(`/my_dev`, {
			headers: { bearer_token: localStorage.getItem("token") },
		})
			.then((response) => {
				var payload = response.data.payload;
				return payload;
			})
			.then((payload) => {
				if (challenges.length == 0) {
					var new_challenges = [];
					for (var chall_id of payload.challenges) {
						api.get(`/challenge?challenge_id=${chall_id}`)
							.then((res) => {
								console.log(res);
								new_challenges.push(res.data.payload);
							})
							.catch((err) => console.log(err));
					}
					setChallenges(new_challenges);
				}

				if (topics.length == 0) {
					var new_topics = [];
					for (var topic_id of payload.topics) {
						api.get(`/topic?topic_id=${topic_id}`)
							.then((res) => {
								console.log(res);
								new_topics.push(res.data.payload);
							})
							.catch((err) => console.log(err));
					}
					setTopics(new_topics);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!checkValidToken()) {
		history.push("/joining/auth");
		return <JoinningPage />;
	}

	const toggle_view = () => {
		if (window.location.pathname.split("/").length <= 3)
			return (
				<>
					<h2>Welcome back, {localStorage.getItem("username")}</h2>
					<ToggleView />
				</>
			);
		return <></>;
	};
	return (
		<>
			<NormalizeContainer>
				{toggle_view()}

				<Switch>
					<Route path={`${path}/challenges`}>
						<div>
							<h1> My Challenge</h1>

							<RoutingBtn darktheme={true} to="/new_challenge">
								Add new challenge
							</RoutingBtn>

							<CardGridContainer>
								{challenges.map((ele) => (
									<Card
										name={ele.challenge_name}
										desc={ele.challenge_desc}
										imgSrc={`${BASE_URL}/${ele.img_loc}`}
										key={ele._id}
										path={`${path}/challenge/${ele._id}`}
										challenge_id={ele._id}
										card_action="View"
										content={ele}
									/>
								))}
							</CardGridContainer>
						</div>
					</Route>

					<Route path={`${path}/topics`}>
						<div>
							<h1> My Topics</h1>

							<RoutingBtn darktheme={true} to="/new_topic">
								Add new topic
							</RoutingBtn>

							<CardGridContainer>
								{topics.map((ele) => (
									<Card
										name={ele.topic_name}
										desc={ele.topic_desc}
										imgSrc={`${BASE_URL}/${ele.banner_img}`}
										key={ele._id}
										path={`${path}/topic/${ele._id}`}
										challenge_id={ele._id}
										card_action="View"
										content={ele}
									/>
								))}
							</CardGridContainer>
						</div>
					</Route>

					<Route path={`${path}/topic/:topicID`}>
						<TopicDev />
					</Route>
					<Route path={`${path}/challenge/:challengeID`}>
						<MyChallenge />
					</Route>
				</Switch>
			</NormalizeContainer>
		</>
	);
};

const MyChallenge = () => {
	var location = useLocation();
	var history = useHistory();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];

	console.log("My challenge page ", id);
	console.log(localStorage.getItem("token"));

	var metadata = {
		data: { challenge_id: id },
		headers: { bearer_token: localStorage.getItem("token") },
	};

	const delChallenge = () => {
		api.delete("/challenge", metadata)
			.then((response) => {
				alert(response.data.message);
				history.push("/dev/challenges");
				history.go();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>

			<SplitContainer>
				<Challenge style={{ flex: "50%" }} />
				<AddTaskChallenge style={{ flex: "50%", margin: "20px" }} id={id} />
			</SplitContainer>

			<ActionBtn onClick={delChallenge} chall_id={id}>
				Delete
			</ActionBtn>
		</>
	);
};

export default DevelopPage;
