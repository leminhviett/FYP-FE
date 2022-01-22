import React from "react";
import { api } from "../../App";
import { useEffect, useState } from "react";
import ActionBtn from "../ActionBtn";
import { useHistory, useLocation } from "react-router-dom";
//for viewing detail 1 challenge
export const TopicView = () => {
	var location = useLocation();
	var history = useHistory();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];

	var [target_page, set_target_page] = useState();

	useEffect(() => {
		api.get(`/topic?topic_id=${id}`)
			.then((response) => {
				console.log(response.data.payload);
				set_target_page(response.data.payload);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log(target_page);
	if (target_page == null) return <></>;
	return (
		<div>
			<h1>Topic: {target_page.topic_name}</h1>
			<h3>Author: {target_page.author_name}</h3>
			{/* <ContentImg
				src={`${process.env.REACT_APP_SERVER_URL}/${target_page.img_loc}`}
			></ContentImg> */}
			<p>{target_page.topic_desc}</p>
			<a href={`${process.env.REACT_APP_SERVER_URL}/${target_page.banner_img}`}>
				Download here
			</a>
			<h2>Sections</h2>
			{target_page.sections.map((section) => {
				return section.tasks.map((task) => {
					return (
						<>
							<p>{task.desc}</p>
						</>
					);
				});
			})}

			<ActionBtn
				onClick={() => {
					var path_name = location.pathname.split("/");
					var id = path_name[path_name.length - 1];
					api.post(
						"/progress/topic",
						{ topic_id: id },
						{ headers: { bearer_token: localStorage.getItem("token") } }
					).then((res) => console.log(res.data));
					history.push(`/topic/${id}`);
				}}
			>
				Enroll
			</ActionBtn>
		</div>
	);
};
