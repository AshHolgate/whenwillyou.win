import * as React from "react";
require("./Hamburger.scss");

export interface HamburgerProps {
	isActive: boolean;
}

export default class Hamburger extends React.Component<HamburgerProps> {
	render() {
		let { isActive } = this.props;
		return (
			<div className={`hamburger ${isActive ? `hamburger--active` : ``}`}>
				<div className={`hamburger__line hamburger__top-bun`} />
				<div className={`hamburger__line hamburger__meat`} />
				<div className={`hamburger__line hamburger__bottom-bun`} />
			</div>
		);
	}
}