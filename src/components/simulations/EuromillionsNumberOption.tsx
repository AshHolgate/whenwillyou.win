import * as React from "react";
require("./EuromillionsNumberOption.scss");

export interface EuromillionsNumberOptionDataProps {
	value: number | null;
	index: number;
	disabled: boolean;
}

export interface EuromillionsNumberOptionDispatchProps {
	onChange: (value: number, index: number) => void;
}

export type EuromillionsNumberOptionProps = EuromillionsNumberOptionDataProps & EuromillionsNumberOptionDispatchProps;

export interface EuromillionsNumberOptionState {

}

export default class EuromillionsNumberOption extends React.Component<EuromillionsNumberOptionProps, EuromillionsNumberOptionState> {
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
		let { value, disabled } = this.props;

		return (
			<input className={`euromillions-number-option ${value ? "euromillions-number-option--filled" : ""}`} onClick={(e) => this.handleClick(e)} value={value || ""}
				onChange={e => this.handleNumericChange(e.target.value)} type="string" pattern="\d*" disabled={disabled}/>
		);
	}
}