import * as React from "react";
require("./Footer.scss");

export interface FooterProps {

}

export default class Footer extends React.Component<FooterProps> {
	render() {
		let { } = this.props;
		return (
			<div className="footer">
				<div className="footer__text-container">
					<p className="footer__text">designed and developed by</p>
					<p className="footer__text footer__text--name">Ashton Holgate</p>
				</div>
			</div>
		);
	}
}