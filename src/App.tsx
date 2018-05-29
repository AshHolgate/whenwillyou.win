import * as React from "react";
import "./App.scss";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import MainRoute from "./components/MainRoute";

class App extends React.Component {
	public render() {
		return (
			<div className="app">
				<Header />
				<MainRoute />
				<Footer />
			</div>
		);
	}
}

export default App;
