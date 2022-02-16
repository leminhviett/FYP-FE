import React from "react";
import NormalizeContainer from "../../NormalizeContainer";
import ActionBtn from "../../ActionBtn";
import { FormContainer, Input } from "../components";
import { useState } from "react";
import { api } from "../../../App";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddChallenges = () => {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [vm, setVm] = useState();
	const [img, setImg] = useState();
	const history = useHistory();

	const submitChallenge = (e) => {
		e.preventDefault();

		if (!img || !vm) {
			alert("Missing image banner or VM file");
			return;
		}
		var form = new FormData();
		form.append("challenge_name", name);
		form.append("challenge_desc", desc);
		form.append("banner_img", img);
		form.append("challenge_vm", vm);

		api.post("/challenge", form, {
			headers: { bearer_token: localStorage.getItem("token") },
		}).then((response) => {
			console.log(response);
			alert(response.data.message);
			history.push("/dev/challenges");
		});
	};
	return (
		<NormalizeContainer>
			<h1>Add new challenges</h1>

			<form style={{ maxWidth: "1000px", width: "80%" }}>
				<FormContainer>
					<label>
						<b>Challenge name</b>
					</label>
					<Input
						type="text"
						placeholder="Enter username"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
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
						<b>VM file</b>
					</label>
					<Input
						type="file"
						onChange={(e) => {
							console.log(e.target.files[0]);
							setVm(e.target.files[0]);
						}}
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

					<ActionBtn darktheme={true} onClick={(e) => submitChallenge(e)}>
						Submit
					</ActionBtn>
				</FormContainer>
			</form>
		</NormalizeContainer>
	);
};

export default AddChallenges;
