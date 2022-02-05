import styled from "styled-components";

const ActionBtn = styled.button`
	border-radius: 50px;
	white-space: nowrap;
	outline: none;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	height: 40%;
	margin: 20px;

	padding: ${({ small }) => (small ? "12px 30px" : "14px 40px")};
	font-size: ${({ small }) => (small ? "14px" : "20px")};

	color: ${({ darktheme }) => (darktheme ? "#010606" : "#fff")};
	background: ${({ darktheme }) => (darktheme ? "#01BF71" : "#010606")};

	&:hover {
		transition: all 0.2s ease-in-out;
		background: ${({ darktheme }) => (darktheme ? "#e8e8e8" : "#01BF71")};
	}
`;

export default ActionBtn;
