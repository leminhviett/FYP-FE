import React from "react";
import NormalizeContainer from "../../NormalizeContainer";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";
import { useHistory } from "react-router-dom";

const AddTopics = () => {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [img, setImg] = useState();
	const history = useHistory();

	const submitTopic = async (e) => {
		e.preventDefault();

		var reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onload = () => {
			var data = {
				topic_name: name,
				topic_desc: desc,
				banner_img: reader.result.split(",")[1],
			};

			api.post("/topic", data, {
				headers: { bearer_token: localStorage.getItem("token") },
			})
				.then((response) => {
					console.log(response);
					alert(response.data.message);
					history.push("/dev/topics");
				})
				.catch((err) => console.log(err));
		};
	};

	console.log("new topics");
	return (
		<NormalizeContainer>
			<h1>Add new topic</h1>

			<form>
				<FormContainer>
					<label>
						<b>Topic name</b>
					</label>
					<Input
						type="text"
						placeholder="Enter username"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
					/>

					<label>
						<b>Description</b>
					</label>
					<Input
						type="text"
						placeholder="Enter pw"
						value={desc}
						onChange={(e) => {
							setDesc(e.target.value);
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

					<ActionBtn darktheme={true} onClick={(e) => submitTopic(e)}>
						Submit
					</ActionBtn>
				</FormContainer>
			</form>
		</NormalizeContainer>
	);
};

export default AddTopics;
