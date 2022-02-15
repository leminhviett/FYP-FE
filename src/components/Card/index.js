import React from "react";
import { Content, ContentImg } from "./components";
import { RoutingBtn } from "../RoutingBtn";

const Card = ({ name, desc, imgSrc, path, card_action }) => {
	return (
		<Content>
			<ContentImg src={imgSrc} alt="img"></ContentImg>

			<>
				<h3>{name}</h3>
				<RoutingBtn to={path} darktheme={true} element={<p>Hello</p>}>
					{card_action}
				</RoutingBtn>
			</>
		</Content>
	);
};

export default Card;
