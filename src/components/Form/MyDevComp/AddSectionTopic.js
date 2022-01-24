import React from "react";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";

const AddSectionTopic = ({ topic_id, visible }) => {
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
	// var style = (visible) => {
	// 	var style_obj = {
	// 		flex: "50%",
	// 		margin: "20px",
	// 	};
	// 	if (visible) return style_obj;

	// 	style_obj["display"] = "none";
	// 	console.log(style_obj);
	// 	return style_obj;
	// };

	var style = () => (visible ? {} : { display: "none" });

	return (
		<div style={style()}>
			<h1>Add new section</h1>

			<form>
				<FormContainer>
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

					<ActionBtn darktheme={true} onClick={(e) => submitTask(e)}>
						Submit
					</ActionBtn>
				</FormContainer>
			</form>
		</div>
	);
};

export default AddSectionTopic;
