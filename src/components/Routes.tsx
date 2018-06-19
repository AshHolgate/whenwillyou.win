import * as React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import simulationsContainer from "../containers/simulationsContainer";
require("./Routes.scss");

export interface RoutesProps {

}

export default class Routes extends React.Component<RoutesProps> {
	render() {
		let { } = this.props;
		return (
			<div className="routes">
				<Switch>
					<Route path="/" component={simulationsContainer} />
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}