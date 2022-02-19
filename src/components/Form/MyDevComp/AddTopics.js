import React from "react";
import NormalizeContainer from "../../NormalizeContainer";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddTopics = () => {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [repo_name, setRepoName] = useState("");

	const [img, setImg] = useState();
	const history = useHistory();

	const submitTopic = async (e) => {
		e.preventDefault();

		if (!img) {
			alert("Banner img is missing");
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(img);
		reader.onload = () => {
			var data = {
				topic_name: name,
				topic_desc: desc,
				banner_img: reader.result.split(",")[1],
				img_repo: repo_name,
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

			<form style={{ maxWidth: "1000px", width: "80%" }}>
				<FormContainer>
					<label>
						<b>Topic name</b>
					</label>
					<Input
						type="text"
						placeholder="Enter topic name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
					/>

					<label>
						<b>Image repo name</b>
					</label>
					<Input
						type="text"
						placeholder="Eg: username/img_name:tag"
						value={repo_name}
						onChange={(e) => {
							setRepoName(e.target.value);
						}}
						required
					/>

					<label>
						<b>Description</b>
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
