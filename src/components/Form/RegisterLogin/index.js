import React from "react";
import { useState } from "react";
import { FormContainer, Input } from "../components";
import ActionBtn from "../../ActionBtn";
import { api } from "../../../App";
import { useHistory } from "react-router-dom";

export const Register = () => {
	const history = useHistory();

	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");
	const [email, setEmail] = useState("");

	const register = (e) => {
		e.preventDefault();

		api.post("/register", { user_name: username, pw: pw })
			.then((response) => {
				const data = response["data"];

				const { payload, error, message } = data;
				console.log(payload, error, message);

				localStorage.setItem("token", payload["bearer_token"]);
				localStorage.setItem("username", payload["user_name"]);

				history.push("/dev/challenges");
			})
			.catch((error) => {
				if (error.response) {
					alert("register failed; " + error.response.data.error);
					setEmail("");
					setPw("");
					setUsername("");
					return;
				}
				alert(error.message);
			});
		console.log("register clicked");
	};
	return (
		<form style={{ width: "800px" }}>
			<FormContainer>
				<h1>Register</h1>

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

				<label>
					<b>Email</b>
				</label>
				<Input
					type="text"
					placeholder="Enter email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>
				<ActionBtn onClick={(e) => register(e)} darktheme={true}>
					Register
				</ActionBtn>
				<p>
					Already have an account? {""}
					<a style={{ color: "#16d987", textDecoration: "none" }} href="/joining/auth">
						Log in now
					</a>
				</p>
			</FormContainer>
		</form>
	);
};

export const Login = () => {
	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");

	const history = useHistory();

	const login = (e) => {
		e.preventDefault();

		api.patch("/auth", { user_name: username, pw: pw, renew_token: true })
			.then((response) => {
				const data = response["data"];

				const { payload, error, message } = data;
				console.log(payload, error, message);

				localStorage.setItem("token", payload["bearer_token"]);
				localStorage.setItem("username", payload["user_name"]);

				history.push("/dev/challenges");
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response);
					alert("register failed; " + error.response.data.error);
					setPw("");
					setUsername("");
					return;
				}
				alert(error.message);
			});
	};
	return (
		<form style={{ width: "800px" }}>
			<FormContainer>
				<h1>Log in</h1>

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
				<ActionBtn onClick={(e) => login(e)} darktheme={true}>
					Log in
				</ActionBtn>
				<p>
					New to CyberExpert? {""}
					<a
						style={{ color: "#16d987", textDecoration: "none" }}
						href="/joining/register"
					>
						Register now
					</a>
				</p>
			</FormContainer>
		</form>
	);
};
