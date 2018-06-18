import * as React from "react";
require("./Divider.scss");

export interface DividerProps {
	title: string;
}

export default class Divider extends React.Component<DividerProps> {
	render() {
		let { title } = this.props;
		return (
			<div className="divider">
				<div className="divider__line" />
				<div className="divider__title">{title}</div>
				<div className="divider__line" />
			</div>
		);
	}
}