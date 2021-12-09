import React from "react";
import CardGridContainer from "../components/CardGridContainer";
import Img1 from "../images/hacking1.jpeg";
import Img2 from "../images/hack2.jpeg";
import Card from "../components/Card";
import NormalizeContainer from "../components/NormalizeContainer";

const ChallengePage = () => {
	const topic = <Card imgSrc={Img1} name="topic" desc="description 1" />;
	const topic2 = <Card imgSrc={Img2} name="topic" desc="description 2" />;

	return (
		<NormalizeContainer>
			<h1>Challenges</h1>
			<CardGridContainer>
				{topic}
				{topic2}
				{topic2}
				{topic2}
				{topic2}
			</CardGridContainer>
		</NormalizeContainer>
	);
};

export default ChallengePage;
