import * as React from "react";
require("./LottoNumberOption.scss");

export interface LottoNumberOptionDataProps {
	value: number | null;
	index: number;
}

export interface LottoNumberOptionDispatchProps {
	onChange: (value: number, index: number) => void;
}

export type LottoNumberOptionProps = LottoNumberOptionDataProps & LottoNumberOptionDispatchProps;

export interface LottoNumberOptionState {

}

export default class LottoNumberOption extends React.Component<LottoNumberOptionProps, LottoNumberOptionState> {
	handleClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
	}

	handleNumericChange(value: number) {
		console.log(value);
		this.props.onChange(value, this.props.index);
	}

	render() {
		let { value } = this.props;
		return (
			<input className={`lotto-number-option ${value ? "lotto-number-option--filled" : ""}`} onClick={(e) => this.handleClick(e)} value={value || ""}
				onChange={e => this.handleNumericChange(parseInt(e.target.value, 0))} type="number"/>
		);
	}
}