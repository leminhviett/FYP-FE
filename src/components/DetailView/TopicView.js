import React from "react";
import { api } from "../../App";
import { useEffect, useState } from "react";
import ActionBtn from "../ActionBtn";
import { useHistory, useLocation } from "react-router-dom";
import { ContentBannerContainer, ContentContainer, ContentBannerImg } from "./components";

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

	if (target_page == null) return <></>;
	const sections = (sections) => {
		return (
			<>
				<div>
					<h2>Sections</h2>

					{sections.map((ele, idx) => (
						<div style={{ "text-indent": "20px" }} key={idx}>
							<h3>
								Section {idx + 1}: {ele.heading}
							</h3>
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
