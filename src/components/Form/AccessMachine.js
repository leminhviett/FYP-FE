import React from "react";
import { useState } from "react";
import { FormContainer, Input } from "./components";
import ActionBtn from "../../components/ActionBtn";
import { api } from "../../App";
import { Rings } from "react-loader-spinner";

const AccessMachineForm = () => {
	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");

	const [ip, setIP] = useState("");
	const [port, setPort] = useState("");

	const [visForm, setVisForm] = useState(true);
	const [visWait, setVisWait] = useState(false);
	const [visRes, setVisRes] = useState(false);

	const [color, setColor] = useState("green");

	const getMachine = (e) => {
		e.preventDefault();

		setColor("green");
		setVisForm(false);
		setVisWait(true);

		api.post("/user_container", { user_name: username, pw: pw })
			.then((response) => {
				console.log(response.data);

				setIP(response.data.payload.ip);
				setPort(response.data.payload.port);

				setVisWait(false);
				setVisRes(true);
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response);
					alert("register failed; " + error.response.data.error);
					setPw("");
					setUsername("");
					return;
				}

				setVisWait(false);
				setVisForm(true);

				alert(error.message);
			});
	};

	const waiting = (visWait) => {
		if (!visWait) return <></>;
		return (
			<>
				<h2>Please wait ...</h2>
				<Rings
					radius={12}
					height={120}
					width={120}
					arialLabel="loading-indicator"
					color={color}
				/>
			</>
		);
	};

	const form = (visForm) => {
		if (!visForm) return <></>;
		return (
			<form style={{ width: "800px" }}>
				<FormContainer>
					<h1>Log in again to access VM</h1>

					<label>
						<b>Username</b>
					</label>
					<Input
						type="text"
						placeholder="Enter username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						required
					/>

					<label>
						<b>Password</b>
					</label>
					<Input
						type="password"
						placeholder="Enter pw"
						value={pw}
						onChange={(e) => {
							setPw(e.target.value);
						}}
						required
					/>
					<ActionBtn onClick={(e) => getMachine(e)} darktheme={true}>
						Get VM
					</ActionBtn>
				</FormContainer>
			</form>
		);
	};

	const result = (visRes) => {
		const terminate = () => {
			setColor("red");
			setVisWait(true);

			api.delete("/user_container", { data: { user_name: username, pw: pw } })
				.then((response) => {
					alert(response.data.message);
					setVisForm(true);
					setVisWait(false);
					setVisRes(false);
				})
				.catch((err) => {
					setVisWait(false);
					alert(err);
				});
		};

		if (!visRes) return <></>;
		return (
			<div style={{ fontSize: "1.15rem", padding: "15px" }}>
				<div>
					<h3>SSH into your machine: </h3>
					<p>
						<b>IP address: </b> {ip}
					</p>
					<p>
						<b>Port: </b> {port}
					</p>
					<p>
						Example command: <i>ssh username@ip -p port</i>
					</p>
				</div>
				<ActionBtn
					onClick={() => {
						terminate();
					}}
				>
					Terminate machine
				</ActionBtn>
			</div>
		);
	};
	return (
		<>
			{waiting(visWait)} {form(visForm)} {result(visRes)}
		</>
	);
};

export default AccessMachineForm;
