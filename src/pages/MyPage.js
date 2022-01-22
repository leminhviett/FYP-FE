import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NormalizeContainer from "../components/NormalizeContainer";
import { checkValidToken } from "../utils";
import JoinningPage from "./JoinningPage";
import { useHistory } from "react-router-dom";
import { api } from "../App";
import { useState, useEffect, useContext } from "react";
import CardGridContainer from "../components/CardGridContainer";
import Card from "../components/Card";
import GlobalContext from "../context/Context";

const MyPage = () => {
	const { path } = useRouteMatch();
	const [content, setContent] = useState([]);
	const [state, dispath] = useContext(GlobalContext);

	useEffect(() => {
		api.get(`/progress/topic`, {
			headers: { bearer_token: localStorage.getItem("token") },
		})
			.then((response) => {
				var payload = JSON.parse(response.data.payload);
				// dispath(fetchLearningTopics(payload));
				return payload.map((ele) => ele.topic_id);
			})
			.then(async (topic_ids) => {
				var new_content = [];

				for (var id of topic_ids) {
					await api.get(`/topic?topic_id=${id}`).then((response) => {
						console.log(response);
						var payload = response.data.payload;
						new_content.push(payload);
						console.log("payload = ", payload);
					});
				}

				setContent(new_content);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const history = useHistory();
	if (!checkValidToken()) {
		history.push("/joining/auth");
		return <JoinningPage />;
	}

	return (
		<>
			<NormalizeContainer>
				<h2>Welcome back, {localStorage.getItem("username")}</h2>

				<h3>Continue your learning</h3>

				<CardGridContainer>
					{content.map((ele) => (
						<Card
							name={ele.topic_name}
							desc={ele.topic_desc}
							imgSrc={`${process.env.REACT_APP_SERVER_URL}/${ele.img_loc}`}
							key={ele._id}
							path={`/topic/${ele._id}`}
							challenge_id={ele._id}
							card_action="Learn"
						/>
					))}
				</CardGridContainer>
			</NormalizeContainer>
		</>
	);
};

export default MyPage;
