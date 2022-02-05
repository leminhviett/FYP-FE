import styled from "styled-components";

export const Content = styled.div`
	background-color: #2a364a;
	padding: 20px 15px;
	margin: 20px 15px;
	width: 75%;
	max-width: 450px;
	max-height: 500px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	border-radius: 5px;
	border-style: groove;
	border-color: #2a364a;
	border-width: thin;
`;

export const ContentImg = styled.img`
	width: 350px;
	max-width: 95%;
	height: 60%;
	max-height: 70%;
	border-radius: 5px;
	--o-object-fit: center;
	object-fit: center;
`;
