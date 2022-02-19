import React from "react";
import { api } from "../../App";
import { useState, useEffect } from "react";
import ActionBtn from "../ActionBtn";
import AddTaskTopic from "../Form/MyDevComp/AddTaskTopic";
import AddSectionTopic from "../Form/MyDevComp/AddSectionTopic";
import { useLocation, useHistory } from "react-router-dom";
import { ContentBannerContainer, ContentContainer, ContentBannerImg } from "./components";
import { SplitContainer } from "../Form/MyDevComp/components";
import ReactHtmlParser from "react-html-parser";

const TopicDev = ({}) => {
	const [target_page, set_target_page] = useState();
	const [taskForm, setTaskForm] = useState(false);
	const [sectionForm, setSectionForm] = useState(false);
	const [sectionIdx, set_sectionIdx] = useState(-1);

	var location = useLocation();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];
	console.log(id);

	var history = useHistory();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];

	useEffect(() => {
		api.get(`/topic?topic_id=${id}`, {
			headers: { bearer_token: localStorage.getItem("token") },
		})
			.then((response) => {
				console.log(response.data.payload);
				set_target_page(response.data.payload);
			})
			.catch((err) => {
				console.log(err);
			});

		var temp = document.body.style;
		document.body.style = "background:#fffdfa";
		return () => (document.body.style = temp);
	}, []);

	if (!target_page) return <></>;

	const sections = (sections) => {
		const tasks = (tasks) => {
			return tasks.map((ele, idx) => {
				return (
					<div style={{ "text-indent": "20px" }} key={idx}>
						<h3>Task {idx + 1}</h3>
						<div style={{ "text-indent": "30px" }} key={idx}>
							{ReactHtmlParser(ele.desc)}
							<p>
								<b>Question</b>: {ele.ques}
							</p>
							<p>
								<b>Answer</b>: {ele.ans}
							</p>
						</div>
					</div>
				);
			});
		};
		return (
			<>
				<div>
					{sections.map((ele, idx) => (
						<ContentContainer key={idx}>
							<div style={{ "text-indent": "10px" }}>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<h3>
										Section {idx + 1}: {ele.heading}
									</h3>
									<ActionBtn
										onClick={() => {
											setSectionForm(false);

											if (sectionIdx == -1) {
												setTaskForm(true);
											} else if (sectionIdx == idx) {
												setTaskForm(!taskForm);
											}

											set_sectionIdx(idx);
										}}
									>
										Add task
									</ActionBtn>
								</div>

								<div>{tasks(ele.tasks)}</div>
							</div>
						</ContentContainer>
					))}
				</div>
			</>
		);
	};
	var form_style = {
		backgroundColor: "white",
		color: "black",
		borderStyle: "groove",
		borderColor: "#2a364a",
		borderWidth: "thin",
	};

	const delTopic = () => {
		var metadata = {
			data: { topic_id: id },
			headers: { bearer_token: localStorage.getItem("token") },
		};

		api.delete("/topic", metadata)
			.then((response) => {
				alert(response.data.message);
				history.push("/dev/challenges");
				history.go();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<SplitContainer>
				<div style={{ flex: "40%" }}>
					<ContentBannerContainer>
						<ContentBannerImg
							src={`${process.env.REACT_APP_SERVER_URL}/${target_page.banner_img}`}
						></ContentBannerImg>
					</ContentBannerContainer>

					<ContentContainer>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<h1>Topic: {target_page.topic_name}</h1>
							<ActionBtn
								onClick={() => {
									setSectionForm(!sectionForm);
									setTaskForm(false);
								}}
							>
								Append section
							</ActionBtn>
						</div>

						<p>
							<b>Author</b>: {target_page.author_name}
						</p>
						<p>
							<b>Runnable Image</b>: {target_page.img_repo}
						</p>
						{ReactHtmlParser(target_page.topic_desc)}
					</ContentContainer>

					{sections(target_page.sections)}
				</div>
				<div
					style={{
						flex: "30%",
						margin: "100px",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<AddSectionTopic topic_id={id} visible={sectionForm} form_style={form_style} />
					<AddTaskTopic
						topic_id={id}
						visible={taskForm}
						section_idx={sectionIdx}
						form_style={form_style}
					/>
				</div>
			</SplitContainer>
			<ActionBtn onClick={delTopic} chall_id={id}>
				Delete
			</ActionBtn>
		</>
	);
};

export default TopicDev;
