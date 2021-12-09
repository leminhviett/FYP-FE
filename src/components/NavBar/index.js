import React from "react";
import { RoutingBtn } from "../RoutingBtn";
import { useLocation } from "react-router-dom";

import { Nav, NavLogo, NavContainer, NavMenu, NavItemRoute, NavBtn } from "./components";
const NavBar = () => {
	const location = useLocation();
	const navHeight = "80px";
	return (
		<>
			<Nav navHeight={navHeight} transparent={location.pathname === "/" ? true : false}>
				<NavContainer>
					<NavLogo to="/">CyberExpert</NavLogo>

					<NavMenu>
						<li style={{ height: navHeight }}>
							<NavItemRoute current_path={location.pathname} to="/topics">
								Learn
							</NavItemRoute>
						</li>
						<li style={{ height: navHeight }}>
							<NavItemRoute current_path={location.pathname} to="/dev">
								Develop
							</NavItemRoute>
						</li>
						<li style={{ height: navHeight }}>
							<NavItemRoute current_path={location.pathname} to="/challenges">
								Challenge
							</NavItemRoute>
						</li>
					</NavMenu>

					<NavBtn>
						<RoutingBtn to="/join_now" darkTheme={true}>
							Join now
						</RoutingBtn>
					</NavBtn>
				</NavContainer>
			</Nav>
		</>
	);
};

export default NavBar;
