import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChallengesPage from "./pages/ChallengesPages";
import JoinningPage from "./pages/JoinningPage";
import DevelopPage from "./pages/DevelopPage";
import TopicsPage from "./pages/TopicsPage";

import Provider from "./context/Provider";
import axios from "axios";
import MyPage from "./pages/MyPage";

import NavBar from "./components/NavBar/";
import { AddChallenges, AddTopics } from "./components/Form/MyDevComp";
import TopicLearn from "./components/DetailView/TopicLearn";

export const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});
function App() {
	return (
		<Provider>
			<Router>
					<NavBar />
					<Switch>
						<Route path="/" component={LandingPage} exact />
						{/* <Route path="/topics" component={LearnPage} exact /> */}
						<Route path="/dev" component={DevelopPage} />
						<Route path="/challenges" component={ChallengesPage} />
						<Route path="/topics" component={TopicsPage} />
						<Route path="/joining" component={JoinningPage} />
						<Route path="/me" component={MyPage} exact />

						<Route path="/new_challenge" component={AddChallenges} />
						<Route path="/new_topic" component={AddTopics} />

						<Route path="/topic" component={TopicLearn} />
					</Switch>
			</Router>
		</Provider>
	);
}

export default App;
