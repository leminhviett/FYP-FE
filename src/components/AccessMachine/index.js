import React from "react";
import { OuterContainer, InnerContainer } from "./components";
import AccessMachineForm from "../Form/AccessMachine";
const AccessMachine = ({ visible }) => {
	var style = () => (visible ? {} : { display: "none" });

	return (
		<OuterContainer style={style()}>
			<InnerContainer>
				<AccessMachineForm />
			</InnerContainer>
		</OuterContainer>
	);
};

export default AccessMachine;
