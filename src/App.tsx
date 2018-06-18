import * as React from "react";
import "./App.scss";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Routes from "./components/Routes";

class App extends React.Component {
	public render() {
		return (
			<div className="app">
				<Header />
				<Routes />
				<Footer />
			</div>
		);
	}
}

export default App;
