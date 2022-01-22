import React from "react";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";

const AddTaskChallenge = ({ id }) => {
	const [caption, setCation] = useState("");
	const [img, setImg] = useState();

	const call_api = (data) => {
		api.post("/challenge/task", data, {
			headers: { bearer_token: localStorage.getItem("token") },
		})
			.then((response) => {
				console.log(response);
				alert(response.data.message);
				// history.push("/dev/topics");
			})
			.catch((err) => console.log(err));
	};
	const submitTaskChallenge = async (e) => {
		e.preventDefault();
		console.log(id);
		if (img) {
			var reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = () => {
				var data = {
					challenge_id: id,
					task_data: { caption: caption, img_data: reader.result.split(",")[1] },
				};
				call_api(data);
			};
		}
		call_api({
			challenge_id: id,
			task_data: { caption: caption },
		});

		// e.preventDefault();
	};

	return (
		<div>
			<h2>Add more tasks</h2>

			<form>
				<FormContainer>
					<label>
						<b>Question</b>
					</label>
					<Input
						type="text"
						placeholder="Enter question"
						value={caption}
						onChange={(e) => {
							setCation(e.target.value);
						}}
						required
					/>

					<label>
						<b>Banner Img</b>
					</label>
					<Input
						type="file"
						onChange={(e) => {
							console.log(e.target.files[0]);
							setImg(e.target.files[0]);
						}}
					/>

					<ActionBtn darktheme={true} onClick={(e) => submitTaskChallenge(e)}>
						Submit
					</ActionBtn>
				</FormContainer>
			</form>
		</div>
	);
};

export default AddTaskChallenge;
