import styled from "styled-components";
import SearchField from "react-search-field";

export const Topic = styled.div`
	background-color: #2a364a;
	padding: 20px 10px;
	margin: 20px 10px;
	width: 350px;
	max-width: 350px;
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

export const TopicsContainer = styled.div`
	color: white;
	display: grid;
	justify-items: center;
	grid-template-columns: auto auto auto;
	grid-row-gap: 1rem;
	grid-column-gap: 2rem;
`;

export const ImageTopic = styled.img`
	width: fit-content;
	max-width: 90%;
	height: 70%;
	max-height: 70%;
	border-radius: 5px;
`;

export const Container = styled.div`
	margin-top: 80px;
	padding: 30px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: white;
`;

export const SearchContainer = styled.div`
	width: 2000px;
	display: flex;
	justify-content: center;
`;

export const CustomSearchField = styled(SearchField)`
	width: 50%;
`;
