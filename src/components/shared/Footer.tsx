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
					<a className="footer__text footer__text--name" href="http://www.ashtonholgate.com">Ashton Holgate</a>
				</div>
			</div>
		);
	}
}