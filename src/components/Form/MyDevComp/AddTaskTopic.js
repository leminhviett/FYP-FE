import React from "react";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddTaskTopic = ({ topic_id, section_idx, visible, form_style }) => {
	const [desc, setDesc] = useState("");
	const [ques, setQues] = useState("");
	const [ans, setAns] = useState("");
	const [img, setImg] = useState();

	console.log(visible);
	const submitTask = async (e) => {
		// e.preventDefault();
		console.log("clicked");

		const helperSubmit = (task_data) => {
			console.log(task_data, section_idx, topic_id);
			// return;
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

		console.log(section_idx);
		if (img) {
			var reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = () => {
				var task_data = {
					desc: desc,
					ques: ques,
					ans: ans,
					img_data: reader.result.split(",")[1],
				};
				helperSubmit(task_data);
			};
		} else {
			var task_data = {
				desc: desc,
				ques: ques,
				ans: ans,
			};

			helperSubmit(task_data);
		}
	};

	var style = () => (visible ? {} : { display: "none" });

	console.log("new task");
	return (
		<div style={style()}>
			<form>
				<FormContainer style={form_style}>
					<h1>New task for section {section_idx + 1}</h1>

					<label>
						<b>Topic Description</b>
					</label>
					<div style={{ width: "83%", padding: "15px", color: "black" }}>
						<CKEditor
							editor={ClassicEditor}
							data={desc}
							onChange={(event, editor) => {
								const data = editor.getData();
								setDesc(data);
							}}
						/>
					</div>

					<label>
						<b>Question</b>
					</label>
					<Input
						type="text"
						placeholder="Enter Question"
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
						placeholder="Enter Answer"
						value={ans}
						onChange={(e) => {
							setAns(e.target.value);
						}}
					/>

					<ActionBtn onClick={(e) => submitTask(e)}>Submit</ActionBtn>
				</FormContainer>
			</form>
		</div>
	);
};

export default AddTaskTopic;
