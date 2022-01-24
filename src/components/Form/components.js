import styled from "styled-components";

export const FormContainer = styled.div`
	padding: 10px;
	width: 90%;
	background-color: #2a364a;
	max-width: 1000px;
	/* position: absolute; */
	/* top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	border-radius: 5px;
`;

export const Input = styled.input`
	width: 80%;
	padding: 15px;
	margin: 15px 0;
	display: inline-block;
	border-radius: 5px;
	border: none;
	background: #f1f1f1;

	&:focus {
		background-color: rgb(195, 255, 216);
		outline: none;
	}
`;
