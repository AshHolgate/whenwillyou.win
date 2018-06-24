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

	handleNumericChange(value: string|null) {
		if (value === "") value = null;
		let parsedValue = parseInt(value!, 0);
		if (parsedValue === NaN) return;
		if (parsedValue > 60) return;
		this.props.onChange(parsedValue, this.props.index);
	}

	render() {
		let { value } = this.props;

		return (
			<input className={`lotto-number-option ${value ? "lotto-number-option--filled" : ""}`} onClick={(e) => this.handleClick(e)} value={value || ""}
				onChange={e => this.handleNumericChange(e.target.value)} type="string" pattern="\d*"/>
		);
	}
}