import React from "react";
import { api } from "../../App";
import { useState, useEffect } from "react";
import ActionBtn from "../ActionBtn";
import AddTaskTopic from "../Form/MyDevComp/AddTaskTopic";
import AddSectionTopic from "../Form/MyDevComp/AddSectionTopic";
import { useLocation } from "react-router-dom";
import { ContentBannerContainer, ContentContainer, ContentBannerImg } from "./components";
import { SplitContainer } from "../Form/MyDevComp/components";

const TopicDev = ({}) => {
	const [target_page, set_target_page] = useState();
	const [taskForm, setTaskForm] = useState(false);
	const [sectionForm, setSectionForm] = useState(false);
	const [sectionIdx, set_sectionIdx] = useState(-1);

	var location = useLocation();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];
	console.log(id);

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
	}, []);

	if (!target_page) return <></>;

	const sections = (sections) => {
		const tasks = (tasks) => {
			return tasks.map((ele, idx) => {
				return (
					<div style={{ "text-indent": "20px" }} key={idx}>
						<h3>Task {idx + 1}</h3>
						<div style={{ "text-indent": "30px" }} key={idx}>
							<p>
								<b>Description</b>: {ele.desc}
							</p>
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
						<div key={idx}>
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
											setTaskForm(!taskForm);
											set_sectionIdx(idx);
										}}
									>
										Add task
									</ActionBtn>
								</div>

								<div>{tasks(ele.tasks)}</div>
							</div>
						</div>
					))}
				</div>
			</>
		);
	};

	return (
		<SplitContainer>
			<div style={{ flex: "40%" }}>
				<ContentBannerContainer>
					<ContentBannerImg
						src={`${process.env.REACT_APP_SERVER_URL}/${target_page.banner_img}`}
					></ContentBannerImg>
				</ContentBannerContainer>
				<h1>Topic: {target_page.topic_name}</h1>

				<ContentContainer>
					<h2>About</h2>
					<p>
						<b>Desc</b>: {target_page.topic_desc}
					</p>
					<p>
						<b>Author</b>: {target_page.author_name}
					</p>
				</ContentContainer>

				<ContentContainer>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<h2>Sections</h2>
						<ActionBtn onClick={() => setSectionForm(!sectionForm)}>
							Append section
						</ActionBtn>
					</div>

					{sections(target_page.sections)}
				</ContentContainer>
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
				<AddSectionTopic topic_id={id} visible={sectionForm} />
				<AddTaskTopic visible={taskForm} section_idx={sectionIdx} topic_id={id} />
			</div>
		</SplitContainer>
	);
};

export default TopicDev;
