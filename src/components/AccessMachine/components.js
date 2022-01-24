import styled from "styled-components";

export const OuterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	z-index: 1;
`;

export const InnerContainer = styled.div`
	width: 600px;
	background-color: #2a364a;
	color: white;
	max-width: 1000px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	border-radius: 5px;
	z-index: 999;
	transition: 0.8s all ease;
`;
