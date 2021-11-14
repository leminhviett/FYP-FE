import React, { useState } from "react";
import Video from "../../videos/video.mp4";
import { Button } from "../Button";
import {
	BannerContainer,
	VideoBg,
	BannerBg,
	BannerH,
	BannerP,
	BannerContent,
	ArrowForward,
	ArrowRight,
	BannerBtnWrapper,
} from "./components";
const Banner = () => {
	var [hover, setHover] = useState(false);

	const onHover = () => {
		setHover(!hover);
	};
	return (
		<BannerContainer>
			<BannerBg>
				<VideoBg autoPlay loop muted src={Video} type="video/mp4" />
			</BannerBg>
			<BannerContent>
				<BannerH>A hacking play ground</BannerH>
				<BannerP>Join us to take your hacking skills to the next level</BannerP>
				<BannerBtnWrapper>
					<Button
						to="/join_now"
						onMouseEnter={onHover}
						onMouseLeave={onHover}
						fontBig="false"
						primary="true"
						dark="true"
					>
						Join now {hover ? <ArrowForward /> : <ArrowRight />}
					</Button>
				</BannerBtnWrapper>
			</BannerContent>
		</BannerContainer>
	);
};

export default Banner;
