import React from "react";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";

const AddTaskTopic = ({ topic_id, section_idx, visible }) => {
	const [desc, setDesc] = useState("");
	const [ques, setQues] = useState("");
	const [ans, setAns] = useState("");
	const [img, setImg] = useState();

	console.log(visible);
	const submitTask = async (e) => {
		// e.preventDefault();
		console.log(section_idx);
		// return;
		var reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onload = () => {
			var task_data = {
				desc: desc,
				ques: ques,
				ans: ans,
				img_data: reader.result.split(",")[1],
			};

			api.post(
				"/topic/task",
				{ section_idx: section_idx, task_data, topic_id: topic_id },
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
	};

	var style = () => (visible ? {} : { display: "none" });

	console.log("new task");
	return (
		<div style={style()}>
			<h1>Add new task</h1>

			<form>
				<FormContainer>
					<label>
						<b>Topic Desc</b>
					</label>
					<Input
						type="text"
						placeholder="Enter username"
						value={desc}
						onChange={(e) => {
							setDesc(e.target.value);
						}}
						required
					/>

					<label>
						<b>Question</b>
					</label>
					<Input
						type="text"
						placeholder="Enter pw"
						value={ques}
						onChange={(e) => {
							setQues(e.target.value);
						}}
						required
					/>

					<label>
						<b>Answer</b>
					</label>
					<Input
						type="text"
						placeholder="Enter pw"
						value={ans}
						onChange={(e) => {
							setAns(e.target.value);
						}}
						required
					/>

					<label>
						<b>Img</b>
					</label>
					<Input
						type="file"
						onChange={(e) => {
							console.log(e.target.files[0]);
							setImg(e.target.files[0]);
						}}
					/>

					<ActionBtn darktheme={true} onClick={(e) => submitTask(e)}>
						Submit
					</ActionBtn>
				</FormContainer>
			</form>
		</div>
	);
};

export default AddTaskTopic;
