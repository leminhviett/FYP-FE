import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Nav = styled.nav`
	background: ${({ transparent }) => (transparent ? "transparent" : "#141a24")};
	height: 80px;
	margin-bottom: -80px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	position: sticky;
	top: 0;
	z-index: 100;

	@media screen and (max-width: 960px) {
		transition: 0.8s all ease;
	}
`;

export const NavContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 80px;
	z-index: 1;
	width: 100%;
	padding: 0 24px;
	max-width: 1600px;
`;

export const NavLogo = styled(LinkR)`
	color: #fff;
	justify-self: flex-start;
	cursor: pointer;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	margin-left: 24px;
	font-weight: bold;
	text-decoration: none;
`;

export const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	list-style: none;
	text-align: center;
	margin-right: -10px;
	color: white;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavItem = styled.li`
	height: 80px;
`;

export const NavBtn = styled.div`
	display: flex;
	align-items: center;
	justify-self: right;

	@media screen and (max-width: 768px) {
		display: None;
	} ;
`;

export const NavItemRoute = styled(LinkR)`
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 2rem;
	height: 100%;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	// set active link
	background-color: ${(props) => (props.current_path === props.to ? "#01bf71" : "none")};
	color: ${(props) => (props.current_path === props.to ? "#000" : "#fff")};

	&:hover {
		background-color: #01bf71;
		color: #000;
	}
`;

export const NavBtnRoute = styled(LinkR)`
	border-radius: 50px;
	background-color: #01bf71;
	white-space: nowrap;
	padding: 10px 22px;
	color: #000;
	font-size: 16px;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin: 8px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #000;
	}
`;
