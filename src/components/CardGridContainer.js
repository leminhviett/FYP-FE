import styled from "styled-components";
const CardGridContainer = styled.div`
	color: white;
	display: grid;
	justify-items: center;
	grid-template-columns: auto auto auto;
	grid-row-gap: 1rem;
	grid-column-gap: 2rem;

	@media screen and (max-width: 768px) {
		grid-template-columns: auto;
	}
`;

export default CardGridContainer;
