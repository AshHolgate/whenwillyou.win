import * as React from "react";
import Hamburger from "./Hamburger";
require("./Header.scss");

export interface HeaderProps {

}

export default class Header extends React.Component<HeaderProps> {
	render() {
		let { } = this.props;
		return (
			<div className="header">
				<div className="header__title-container">
					<div className="header__logo-container">
						<h1 className="header__letter header__1">W</h1>
						<h1 className="header__letter header__2">W</h1>
						<h1 className="header__letter header__3">Y</h1>
						<h1 className="header__letter header__4">.</h1>
						<h1 className="header__letter header__5">W</h1>
					</div>
				</div>
				<Hamburger isActive={false}/>
			</div>
		);
	}
}