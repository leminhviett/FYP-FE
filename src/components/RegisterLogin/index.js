import React from "react";
import { useState } from "react";
import { RoutingBtn } from "../RoutingBtn";
import { FormContainer, Input } from "./components";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");
	const [email, setEmail] = useState("");

	return (
		<form>
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

				<p>Already have an account ? </p>
				<RoutingBtn to="auth" small={true} darkTheme={true}>
					Login now
				</RoutingBtn>
			</FormContainer>
		</form>
	);
};

export const Login = () => {
	const [username, setUsername] = useState("");
	const [pw, setPw] = useState("");
	return (
		<form>
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
				<p>New to CyberExpert? </p>
				<RoutingBtn to="register" small={true} darkTheme={true}>
					Register now
				</RoutingBtn>
			</FormContainer>
		</form>
	);
};
