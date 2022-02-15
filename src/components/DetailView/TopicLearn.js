import React from "react";
import NormalizeContainer from "../NormalizeContainer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Collapsible from "react-collapsible";

import { ContentBannerContainer, ContentContainer, ContentBannerImg } from "./components";
import { api } from "../../App";
import "./collapsible.css";
import { Input } from "../Form/components";
import ActionBtn from "../ActionBtn";
import TargetMachine from "../TargetMachine";

const TopicLearn = () => {
	var location = useLocation();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];
	//add to learner progress

	const [done, setDone] = useState();
	var [target_page, set_target_page] = useState();

	useEffect(() => {
		// set special BG then return back in clean up
		var temp = document.body.style;
		document.body.style = "background:#faf7f2";

		return () => (document.body.style = temp);
	}, []);

	const get_progress = () => {
		api.get(`/progress/topic/${id}`, {
			headers: { bearer_token: localStorage.getItem("token") },
		})
			.then((res) => {
				console.log(res.data.payload);
				setDone(res.data.payload.done);
			})
			.catch((err) => {
				console.log("error", err);
			});
	};

	const get_topic = () => {
		api.get(`/topic?topic_id=${id}`)
			.then((response) => {
				console.log(response.data.payload);
				set_target_page(response.data.payload);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		get_progress();
		get_topic();
	}, []);

	const Section = ({ section_idx, section }) => {
		return (
			<Collapsible
				trigger={`Section ${section_idx + 1}: ${section.heading}`}
				triggerClassName="trigger_class"
				triggerOpenedClassName="trigger_class_opened"
				contentInnerClassName="content_inner"
				triggerTagName="div"
			>
				{section.tasks.map((ele, idx) => (
					<Task
						task_idx={idx}
						task={ele}
						section_idx={section_idx}
						id={id}
						done={done}
						key={idx}
					/>
				))}
			</Collapsible>
		);
	};

	const Task = ({ task, task_idx, section_idx }) => {
		const check_correct_ans = () => done && done[section_idx] && done[section_idx][task_idx];

		const [ans, setAns] = useState("");
		const [localDone, setLocalDone] = useState(
			check_correct_ans() ? done[section_idx][task_idx] : null
		);

		const submitAns = (e) => {
			e.preventDefault();

			api.patch(
				"/progress/topic",
				{
					bearer_token: localStorage.getItem("token"),
					topic_id: id,
					section_idx: section_idx,
					task_idx: task_idx,
					task_ans: ans,
				},
				{
					headers: { bearer_token: localStorage.getItem("token") },
				}
			)
				.then((response) => {
					console.log(response.data);
					setLocalDone(ans);
				})
				.catch((err) => {
					alert("Wrong answer");
				});
		};

		return (
			<>
				<h3>Task {task_idx + 1}</h3>
				<p>{task.desc}</p>
				<p>
					<b>Question:</b> {task.ques}
				</p>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Input
						type="text"
						value={localDone || localDone == "" ? localDone : ans}
						placeholder={`Hint: ${task.ans}`}
						onChange={(e) => setAns(e.target.value)}
						disabled={localDone || localDone == "" ? "disabled" : ""}
					></Input>
					<ActionBtn
						onClick={(e) => {
							submitAns(e);
						}}
						disabled={localDone || localDone == ""}
						darktheme={localDone || localDone == ""}
					>
						{localDone || localDone == "" ? "Correct Answer" : "Submit"}
					</ActionBtn>
				</div>
			</>
		);
	};
	if (!target_page || !done) return <></>;

	const target_machine = () => {
		if (target_page.img_repo != "") {
			return (
				<ContentContainer>
					<TargetMachine resource_name={target_page.img_repo} />
				</ContentContainer>
			);
		}
		return;
	};
	return (
		<NormalizeContainer>
			<div style={{ width: "80%" }}>
				<ContentBannerContainer>
					<div>
						<ContentBannerImg
							src={`${process.env.REACT_APP_SERVER_URL}/${target_page.banner_img}`}
						></ContentBannerImg>
					</div>
				</ContentBannerContainer>
				{target_machine()}
				<ContentContainer>
					<h1>Topic: {target_page.topic_name}</h1>
					<p>
						<b>Author</b>: {target_page.author_name}
					</p>
					<p>
						<b>Description</b>
					</p>
					<p>{target_page.topic_desc}</p>
				</ContentContainer>
				{target_page.sections.map((ele, idx) => (
					<Section section_idx={idx} section={ele} topic_id={id} done={done} key={idx} />
				))}
			</div>
		</NormalizeContainer>
	);
};

export default TopicLearn;
