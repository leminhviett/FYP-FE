import styled from "styled-components";

export const ContentContainer = styled.div`
	background-color: #2a364a;
	margin-bottom: 10px;
	padding: 15px;
	padding-left: 25px;
	padding-right: 25px;
`;

export const ContentBannerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	width: 900px;
	max-width: 90%
	overflow: hidden;
`;

export const ContentBannerImg = styled.img`
	height: 300px;
	width: 90%;
	--o-object-fit: cover;
	object-fit: cover;
	background: #232a24;
`;
