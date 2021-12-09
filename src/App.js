import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar/";
import ChallengePage from "./pages/ChallengePages";

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" component={LandingPage} exact />
				{/* <Route path="/topics" component={LearnPage} exact />
				<Route path="/dev" component={DevelopPage} exact /> */}
				<Route path="/challenges" component={ChallengePage} exact />
			</Switch>
		</Router>
	);
}

export default App;
