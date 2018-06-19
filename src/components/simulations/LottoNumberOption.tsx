import * as React from "react";
require("./LottoNumberOption.scss");

export interface LottoNumberOptionProps {

}

export interface LottoNumberOptionState {

}

export default class LottoNumberOption extends React.Component<LottoNumberOptionProps, LottoNumberOptionState> {
	handleClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
	}

	render() {
		return (
			<input className="lotto-number-option" onClick={(e) => this.handleClick(e)} />
		);
	}
}