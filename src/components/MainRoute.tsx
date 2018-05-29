import * as React from "react";
require("./MainRoute.scss");

export interface MainRouteProps {

}

export default class MainRoute extends React.Component<MainRouteProps> {
	render() {
		let { } = this.props;
		return (
			<div className="main-route">
				<h1 className="main-route__title">lol</h1>
			</div>
		);
	}
}