import React from "react";
import { api } from "../../App";
import { useEffect, useState } from "react";
import ActionBtn from "../ActionBtn";
import { useHistory, useLocation } from "react-router-dom";
import { ContentBannerContainer, ContentContainer, ContentBannerImg } from "./components";

import ReactHtmlParser from "react-html-parser";

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
		// set special BG then return back in clean up

		var temp = document.body.style;
		document.body.style = "background:#fffdfa";
		return () => (document.body.style = temp);
	}, []);

	if (target_page == null) return <></>;
	const sections = (sections) => {
		return (
			<>
				<div>
					<h2>Sections</h2>

					{sections.map((ele, idx) => (
						<div style={{ "text-indent": "20px" }} key={idx}>
							<p>
								Section {idx + 1}: {ele.heading}
							</p>
						</div>
					))}
				</div>
			</>
		);
	};
	return (
		<>
			<div>
				<ContentBannerContainer>
					<ContentBannerImg
						src={`${process.env.REACT_APP_SERVER_URL}/${target_page.banner_img}`}
					></ContentBannerImg>
				</ContentBannerContainer>

				<ContentContainer>
					<h1>Topic: {target_page.topic_name}</h1>
					<p>
						<b>Author</b>: {target_page.author_name}
					</p>
					{ReactHtmlParser(target_page.topic_desc)}
				</ContentContainer>
				<ContentContainer>{sections(target_page.sections)}</ContentContainer>
			</div>
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
				Enroll for more
			</ActionBtn>
		</>
	);
};
