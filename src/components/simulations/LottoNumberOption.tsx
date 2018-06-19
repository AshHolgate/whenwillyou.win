import * as React from "react";
require("./LottoNumberOption.scss");

export interface LottoNumberOptionProps {

}

export interface LottoNumberOptionState {

}

export default class LottoNumberOption extends React.Component<LottoNumberOptionProps, LottoNumberOptionState> {
	handleLuckyDipClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		console.log(this);
	}

	render() {
		return (
			<input className="lotto-number-option" onClick={(e) => this.handleLuckyDipClick(e)} />
		);
	}
}