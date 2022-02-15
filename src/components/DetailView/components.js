import styled from "styled-components";

export const ContentContainer = styled.div`
	margin-bottom: 10px;
	padding: 15px;
	padding-left: 25px;
	padding-right: 25px;
	background-color: #f7f7f7;
	color: black;
	border-style: groove;
	border-color: #2a364a;
	border-width: thin;
`;

export const ContentBannerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	width: 900px;
	max-width: 90%
	overflow: hidden;
	margin: 50px 0;
`;

export const ContentBannerImg = styled.img`
	height: 350px;
	width: 90%;
	--o-object-fit: center;
	object-fit: center;
	background: #232a24;
`;
