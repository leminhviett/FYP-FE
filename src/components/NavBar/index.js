import React from "react";
import { Button } from "../Button";
import { useLocation } from "react-router-dom";

import { Nav, NavLogo, NavContainer, NavMenu, NavItem, NavItemRoute, NavBtn } from "./components";
const NavBar = () => {
	const location = useLocation();

	return (
		<>
			<Nav transparent={location.pathname === "/" ? true : false}>
				<NavContainer>
					<NavLogo to="/">Logo</NavLogo>

					<NavMenu>
						<NavItem>
							<NavItemRoute current_path={location.pathname} to="/learn/topics">
								Learn
							</NavItemRoute>
						</NavItem>
						<NavItem>
							<NavItemRoute current_path={location.pathname} to="/develop/topics">
								Develop
							</NavItemRoute>
						</NavItem>
						<NavItem>
							<NavItemRoute current_path={location.pathname} to="/challenge/topics">
								Challenge
							</NavItemRoute>
						</NavItem>
					</NavMenu>

					<NavBtn>
						<Button to="/join_now" primary="true" dark="true">
							Join now
						</Button>
					</NavBtn>
				</NavContainer>
			</Nav>
		</>
	);
};

export default NavBar;
