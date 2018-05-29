import * as React from "react";
require("./Hamburger.scss");

export interface HamburgerProps {
	isActive: boolean;
}

export default class Hamburger extends React.Component<HamburgerProps> {
	render() {
		let { isActive } = this.props;
		return (
			<div className="hamburger">
				<div className={`hamburger__line hamburger__top-bun ${isActive ? `active` : ``}`} />
				<div className={`hamburger__line hamburger__meat ${isActive ? `active` : ``}`} />
				<div className={`hamburger__line hamburger__bottom-bun ${isActive ? `active` : ``}`} />
			</div>
		);
	}
}