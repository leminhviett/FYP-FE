export const FETCH_TOPIC = "fetch topic";
export function fetchTopic(payload) {
	return {
		type: FETCH_TOPIC,
		payload: payload,
	};
}

export const FETCH_CHALLENGE = "fetch challenge";
export function fetchChallenge(payload) {
	return {
		type: FETCH_CHALLENGE,
		payload: payload,
	};
}

export const FETCH_LEARNING_TOPICS = "fetch my learning topics";
export function fetchLearningTopics(payload) {
	return {
		type: FETCH_LEARNING_TOPICS,
		payload: payload,
	};
}

export const FETCH_DEV_TOPICS = "fetch my dev topics";
export function fetchDevTopics(payload) {
	return {
		type: FETCH_DEV_TOPICS,
		payload: payload,
	};
}

export const FETCH_DEV_CHALL = "fetch my dev challeges";
export function fetchDevChallenges(payload) {
	return {
		type: FETCH_DEV_CHALL,
		payload: payload,
	};
}
