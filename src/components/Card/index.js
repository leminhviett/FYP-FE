import React from "react";
import { Content, ContentImg } from "./components";
import { RoutingBtn } from "../RoutingBtn";
const Card = ({ name, desc, imgSrc, challenge_id }) => {
	return (
		<Content>
			<ContentImg src={imgSrc} alt="img"></ContentImg>

			<>
				<h3>{name}</h3>
				<p>{desc}</p>
				<RoutingBtn to={`/challenges/${challenge_id}`} primary="true" dark="true">
					Hack
				</RoutingBtn>
			</>
		</Content>
	);
};

export default Card;
