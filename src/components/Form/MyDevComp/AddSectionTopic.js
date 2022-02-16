import React from "react";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";

const AddSectionTopic = ({ topic_id, visible, form_style }) => {
	const [heading, setHeading] = useState("");

	const submitTask = async (e) => {
		// e.preventDefault();
		// console.log(topic_id, visible);

		api.post(
			"/topic/section",
			{ section_heading: heading, topic_id: topic_id },
			{
				headers: { bearer_token: localStorage.getItem("token") },
			}
		)
			.then((response) => {
				console.log(response);
				alert(response.data.message);
			})
			.catch((err) => console.log(err));
	};

	var style = () => (visible ? {} : { display: "none" });

	return (
		<div style={style()}>
			<form>
				<FormContainer style={form_style}>
					<h1>New section</h1>

					<label>
						<b>Section Heading</b>
					</label>
					<Input
						type="text"
						placeholder="Enter heading"
						value={heading}
						onChange={(e) => {
							setHeading(e.target.value);
						}}
						required
					/>

					<ActionBtn onClick={(e) => submitTask(e)}>Submit</ActionBtn>
				</FormContainer>
			</form>
		</div>
	);
};

export default AddSectionTopic;
