import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { RoutingBtn } from "../RoutingBtn";
import { Container, ViewContainer } from "./components";
const ToggleView = () => {
	const location = useLocation();

	return (
		<Container>
			<ViewContainer>
				<RoutingBtn
					to={"/dev/challenges"}
					darktheme={location.pathname === "/dev/challenges"}
					squared="true"
				>
					Challenges View
				</RoutingBtn>
			</ViewContainer>
			<ViewContainer>
				<RoutingBtn
					to="/dev/topics"
					darktheme={location.pathname === "/dev/topics"}
					squared="true"
					onClick={() => console.log("clicked")}
				>
					Topics View
				</RoutingBtn>
			</ViewContainer>
		</Container>
	);
};

export default ToggleView;
