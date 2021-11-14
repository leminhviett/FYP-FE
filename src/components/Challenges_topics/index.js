import React from "react";
import {
	Topic,
	TopicsContainer,
	ImageTopic,
	Container,
	CustomSearchField,
	SearchContainer,
} from "../Topics/components";
import Img1 from "../../images/hacking1.jpeg";
import Img2 from "../../images/hack2.jpeg";

import { Button } from "../Button";
import SearchField from "react-search-field";

function x() {
	var temp = [];
	var topic = (
		<Topic>
			<ImageTopic src={Img1} alt="img"></ImageTopic>

			<>
				<h3>Topic name</h3>
				<p>Description</p>
				<Button primary="true" dark="true">
					Hack
				</Button>
			</>
		</Topic>
	);

	var topic2 = (
		<Topic>
			<ImageTopic src={Img2} alt="img"></ImageTopic>

			<>
				<h3>Topic name</h3>
				<p>Description</p>
				<Button primary="true" dark="true">
					Hack
				</Button>
			</>
		</Topic>
	);
	for (var i = 0; i < 6; i++) {
		if (i % 2 == 0) temp.push(topic);
		else {
			temp.push(topic2);
		}
	}
	return temp;
}
const ChallengesTopics = () => {
	return (
		<Container>
			<h1>Let's hack it!</h1>
			<TopicsContainer>{x()}</TopicsContainer>
		</Container>
	);
};

export default ChallengesTopics;
