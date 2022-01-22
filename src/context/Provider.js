import { useReducer } from "react";
import { reducer, init_state } from "./reducer";
import GlobalContext from "./Context";

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, init_state);
	// console.log(state);
	return <GlobalContext.Provider value={[state, dispatch]}>{children}</GlobalContext.Provider>;
};

export default Provider;
