import {
	FETCH_TOPIC,
	FETCH_CHALLENGE,
	FETCH_LEARNING_TOPICS,
	FETCH_DEV_TOPICS,
	FETCH_DEV_CHALL,
} from "./action";
export const init_state = {
	topics: new Map(),
	challenges: new Map(),
	me: {
		learning_topics: [],
		dev: {
			topics: [],
			challenges: [],
		},
	},
};

export function reducer(state, action) {
	switch (action.type) {
		case FETCH_TOPIC:
			return {
				...state,
				topics: state.topics.set(action.payload.page, action.payload.content),
			};
		case FETCH_CHALLENGE:
			return {
				...state,
				challenges: state.challenges.set(action.payload.page, action.payload.content),
			};
		case FETCH_LEARNING_TOPICS:
			var newState = { ...state };
			newState.me.learning_topics = action.payload;
			return newState;
		case FETCH_DEV_CHALL:
			return;
		default:
			throw new Error("Invalid Action");
	}
}
