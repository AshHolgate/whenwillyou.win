import * as React from "react";
import Simulations from "./simulations/Simulations";
require("./Routes.scss");

export interface RoutesProps {

}

export default class Routes extends React.Component<RoutesProps> {
	render() {
		let { } = this.props;
		return (
			<div className="routes">
				<Simulations />
			</div>
		);
	}
}