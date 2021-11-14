import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LearnPage from "./pages/LearnPage";
import NavBar from "./components/NavBar/";
import DevelopPage from "./pages/DevelopPages";
import ChallengePage from "./pages/ChallengePages";

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" component={LandingPage} exact />
				<Route path="/learn/topics" component={LearnPage} exact />
				<Route path="/develop/topics" component={DevelopPage} exact />
				<Route path="/challenge/topics" component={ChallengePage} exact />
			</Switch>
		</Router>
	);
}

export default App;
