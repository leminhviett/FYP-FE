import React from "react";
import { OuterContainer, InnerContainer } from "./components";
import { Login } from "../Form/RegisterLogin";
const AccessMachine = ({ visible }) => {
	var style = () => (visible ? {} : { display: "none" });

	return (
		<OuterContainer style={style()}>
			<InnerContainer>
				<p>AccessMachine</p>
				<Login />
			</InnerContainer>
		</OuterContainer>
	);
};

export default AccessMachine;
