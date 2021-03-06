import styled from "styled-components";
import { Link } from "react-router-dom";

export const RoutingBtn = styled(Link)`
	border-radius: ${({ squared }) => (squared ? "5px" : "50px")};
	white-space: nowrap;
	outline: none;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s ease-in-out;
	text-decoration: none;

	background: ${({ darktheme }) => (darktheme ? "#01BF71" : "#010606")};
	color: ${({ darktheme }) => (darktheme ? "#010606" : "#fff")};
	padding: ${({ small }) => (small ? "12px 30px" : "14px 40px")};
	font-size: ${({ small }) => (small ? "14px" : "20px")};
	width: fit-content;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #010606;
	}
`;
