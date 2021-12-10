import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar/";
import ChallengesPage from "./pages/ChallengesPages";
import JoinningPage from "./pages/JoinningPage";

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" component={LandingPage} exact />
				{/* <Route path="/topics" component={LearnPage} exact />
				<Route path="/dev" component={DevelopPage} exact /> */}
				<Route path="/challenges" component={ChallengesPage} />
				<Route path="/joining" component={JoinningPage} />
			</Switch>
		</Router>
	);
}

export default App;
