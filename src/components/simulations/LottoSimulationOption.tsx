import * as React from "react";
require("./LottoSimulationOption.scss");

export interface LottoSimulationOptionProps {

}

export interface LottoSimulationOptionState {
	isActive: boolean;
}

export default class LottoSimulationOption extends React.Component<LottoSimulationOptionProps, LottoSimulationOptionState> {
	constructor(props: LottoSimulationOptionProps) {
		super(props);
		this.state = {
			isActive: false
		};
	}

	handleOpenClick() {
		this.setState(prevState => ({
			isActive: !prevState.isActive
		}));
	}

	handleLuckyDipClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		console.log(e);
	}

	render() {
		let { isActive } = this.state;
		return (
			<div className={`lotto-simulation-option ${isActive ? "lotto-simulation-option--active" : ""}`} onClick={() => this.handleOpenClick()}>
				<h2 className={`lotto-simulation-option__title ${isActive ? "lotto-simulation-option__title--active" : ""}`} >Lotto</h2>
				<div className={`lotto-simulation-option__sub-title-container ${isActive ? "lotto-simulation-option__sub-title-container--active" : ""}`}>
					<p className={`lotto-simulation-option__sub-title`}>Choose Numbers</p>
					<button className={`lotto-simulation-option__lucky-dip-button`} onClick={this.handleLuckyDipClick}>Lucky Dip</button>
				</div>
			</div>
		);
	}
}