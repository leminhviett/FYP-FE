import React from "react";
import { useState } from "react";
import ActionBtn from "../../components/ActionBtn";
import { api } from "../../App";
import { Rings } from "react-loader-spinner";

const TargetMachine = ({ path }) => {
	const [ip, setIP] = useState("");
	const [port, setPort] = useState("");

	const [visQuery, setVisQuery] = useState(true);
	const [visWait, setVisWait] = useState(false);
	const [visRes, setVisRes] = useState(false);

	const [color, setColor] = useState("green");

	const getMachine = (e) => {
		e.preventDefault();

		setColor("green");
		setVisQuery(false);
		setVisWait(true);

		api.post(`${path}`, { user_name: localStorage.getItem("username") })
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

					return;
				}

				setVisWait(false);
				setVisQuery(true);

				alert(error.message);
			});
	};

	const waiting = (visWait) => {
		if (!visWait) return <></>;
		return (
			<Rings
				radius={12}
				height={120}
				width={120}
				arialLabel="loading-indicator"
				color={color}
			/>
		);
	};

	const query = (visQuery) => {
		if (!visQuery) return <></>;
		return (
			<>
				<div>
					<h2>Start Target Machine</h2>
					<p>Start the machine then attack it with your Attack Machine</p>
				</div>

				<ActionBtn darktheme={true} onClick={(e) => getMachine(e)}>
					Start
				</ActionBtn>
			</>
		);
	};

	const result = (visRes) => {
		const terminate = () => {
			setColor("red");
			setVisWait(true);

			api.delete(`${path}`, { data: { user_name: localStorage.getItem("username") } })
				.then((response) => {
					alert(response.data.message);
					setVisQuery(true);
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
			<>
				<div>
					<h2>Target machine detail</h2>
					<p>
						<b>IP address: </b> {ip}
					</p>
					<p>
						<b>Port: </b> {port}
					</p>
				</div>
				<ActionBtn
					onClick={() => {
						terminate();
					}}
				>
					Terminate machine
				</ActionBtn>
			</>
		);
	};
	return (
		<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
			{waiting(visWait)} {query(visQuery)} {result(visRes)}
		</div>
	);
};

export default TargetMachine;
