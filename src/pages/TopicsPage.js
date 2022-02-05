import React from "react";
import CardGridContainer from "../components/CardGridContainer";
import Card from "../components/Card";
import NormalizeContainer from "../components/NormalizeContainer";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { api } from "../App";
import { useEffect, useContext, useState } from "react";
import GlobalContext from "../context/Context";
import ActionBtn from "../components/ActionBtn";
import { Container, ViewContainer } from "../components/ToggleView/components";
import { fetchTopic } from "../context/action";
import { TopicView } from "../components/DetailView/TopicView";

const TopicsPage = () => {
	const { path } = useRouteMatch();
	const [state, dispatch] = useContext(GlobalContext);
	const [page_no, set_page_no] = useState(1);
	const [content, set_content] = useState([]);

	useEffect(async () => {
		//fetch topic
		var content;

		if (state.topics.has(page_no)) {
			content = state.topics.get(page_no);
			console.log("content locally");
			set_content(content);
			return;
		}

		await api.get(`/topics/${page_no}`).then((response) => {
			var topics = JSON.parse(response.data.payload);
			dispatch(fetchTopic({ page: page_no, content: topics }));

			content = topics;
			console.log("content remotely");
			console.log(content);
			set_content(content);
		});
	}, [page_no]);

	return (
		<>
			<NormalizeContainer>
				<Switch>
					<Route exact path={path}>
						<h1>Topics</h1>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
							}}
						>
							<div>
								<h2>Featured Topics</h2>
								<div>
									<Card
										name={"SQL Injection"}
										card_action="View"
										imgSrc={`${process.env.REACT_APP_SERVER_URL}/img/SQL Injection_64633bd2-7346-4e63-b05a-28604ddadc53.png`}
										path={`${path}/view/featured/61fddf54b8c48f849c7e1e27`}
									/>
								</div>
							</div>

							<div>
								<h2>All Topics</h2>
								<CardGridContainer>
									{content.map((ele) => {
										ele.id = ele._id["$oid"];
										return (
											<Card
												name={ele.topic_name}
												desc={ele.topic_desc}
												imgSrc={`${process.env.REACT_APP_SERVER_URL}/${ele.banner_img}`}
												key={ele._id["$oid"]}
												path={`${path}/view/${page_no}/${ele.id}`}
												page_no={page_no}
												card_action="View"
											/>
										);
									})}
								</CardGridContainer>

								<Container>
									<ViewContainer>
										<ActionBtn
											onClick={() => set_page_no(page_no - 1)}
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
											onClick={() => set_page_no(page_no + 1)}
											disabled={content.length == 0}
										>
											Next
										</ActionBtn>
									</ViewContainer>
								</Container>
							</div>
						</div>
					</Route>
					<Route path={`${path}/view/:page_no/:topicID`}>
						<TopicView />
					</Route>
				</Switch>
			</NormalizeContainer>
		</>
	);
};

export default TopicsPage;
