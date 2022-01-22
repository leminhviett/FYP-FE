import React from "react";
import { api } from "../../App";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ContentBannerContainer, ContentContainer, ContentBannerImg } from "./components";

const Challenge = () => {
	var location = useLocation();
	var temp = location.pathname.split("/");
	var id = temp[temp.length - 1];

	var [target_page, set_target_page] = useState();

	useEffect(() => {
		api.get(`/challenge?challenge_id=${id}`)
			.then((response) => {
				console.log(response.data.payload);
				set_target_page(response.data.payload);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!target_page) return <></>;

	return (
		<div style={{ width: "60%" }}>
			<ContentBannerContainer>
				<ContentBannerImg
					src={`${process.env.REACT_APP_SERVER_URL}/${target_page.img_loc}`}
				></ContentBannerImg>
			</ContentBannerContainer>
			<h1>Challenge: {target_page.challenge_name}</h1>

			<ContentContainer>
				<h2>About</h2>
				<p>Desc: {target_page.challenge_desc}</p>
				<p>Author: {target_page.author_name}</p>
			</ContentContainer>

			<ContentContainer>
				<h2>Virtual Machine</h2>
				<p>
					Download VM{" "}
					<a href={`${process.env.REACT_APP_SERVER_URL}/${target_page.challenge_vm}`}>
						here
					</a>
				</p>
			</ContentContainer>

			<ContentContainer>
				<h2>Tasks</h2>
				{target_page.tasks.map((ele, idx) => (
					<div style={{ "text-indent": "20px" }}>
						<h3>
							Task {idx}: {ele.caption}
						</h3>
						<p>Screenshot: </p>
						<img
							style={{ "max-width": "150px" }}
							src={`${process.env.REACT_APP_SERVER_URL}/${ele.img_loc}`}
						></img>
					</div>
				))}
			</ContentContainer>
		</div>
	);
};

export default Challenge;

// components
