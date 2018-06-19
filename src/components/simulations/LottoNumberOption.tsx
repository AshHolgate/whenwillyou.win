import * as React from "react";
require("./LottoNumberOption.scss");

export interface LottoNumberOptionProps {
	value: number | null;
}

export interface LottoNumberOptionState {

}

export default class LottoNumberOption extends React.Component<LottoNumberOptionProps, LottoNumberOptionState> {
	handleClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
	}

	render() {
		let { value } = this.props;
		return (
			<input className={`lotto-number-option ${value ? "lotto-number-option--filled" : ""}`} onClick={(e) => this.handleClick(e)} value={value || ""}/>
		);
	}
}