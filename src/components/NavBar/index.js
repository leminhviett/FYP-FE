import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Nav, NavLogo, NavContainer, NavMenu, NavItemRoute, NavBtn } from "./components";
import { checkValidToken } from "../../utils";
import { RoutingBtn } from "../RoutingBtn";
import ActionBtn from "../ActionBtn";
import AccessMachine from "../AccessMachine";
import { useState } from "react";

const NavBar = () => {
	const location = useLocation();
	const navHeight = "80px";
	const history = useHistory();
	const [visible, setVisible] = useState(false);

	const DevTab = () => {
		if (!checkValidToken()) return;

		return (
			<li style={{ height: navHeight }}>
				<NavItemRoute current_path={location.pathname} to="/dev">
					Develop
				</NavItemRoute>
			</li>
		);
	};

	const LogInOut = () => {
		if (!checkValidToken())
			return (
				<RoutingBtn to="/joining/auth" darktheme="true">
					Join now
				</RoutingBtn>
			);

		return (
			<>
				<ActionBtn
					onClick={(e) => {
						localStorage.clear();
						history.push("/");
					}}
					darktheme={true}
				>
					Log out
				</ActionBtn>

				<ActionBtn
					onClick={(e) => {
						setVisible(!visible);

						console.log("clicked ", visible);
					}}
				>
					Access Machine
				</ActionBtn>
			</>
		);
	};

	const main_page = () => {
		if (!checkValidToken()) return "/";
		return "/me";
	};

	return (
		<>
			<Nav navHeight={navHeight} transparent={location.pathname === "/" ? true : false}>
				<NavContainer>
					<NavLogo to={main_page()}>CyberExpert</NavLogo>

					<NavMenu>
						<li style={{ height: navHeight }}>
							<NavItemRoute current_path={location.pathname} to="/topics">
								Learn
							</NavItemRoute>
						</li>
						{DevTab()}
						<li style={{ height: navHeight }}>
							<NavItemRoute current_path={location.pathname} to="/challenges">
								Challenge
							</NavItemRoute>
						</li>
					</NavMenu>

					<NavBtn>{LogInOut()}</NavBtn>
				</NavContainer>
			</Nav>
			<AccessMachine visible={visible} />
		</>
	);
};

export default NavBar;
