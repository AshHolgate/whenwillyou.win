import * as React from "react";
import LottoNumberOption from "./LottoNumberOption";
import SimulationData from "../../models/Simulation";
require("./LottoSimulation.scss");

export interface LottoSimulationProps {
	simulation: SimulationData;
}

export interface LottoSimulationState {
	isOpen: boolean;
}

export default class LottoSimulation extends React.Component<LottoSimulationProps, LottoSimulationState> {
	constructor(props: LottoSimulationProps) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	handleOpenClick() {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	}

	handleLuckyDipClick(e: React.MouseEvent<HTMLElement>) {
		if (!this.state.isOpen) return;
		e.stopPropagation();
		console.log(this);
	}

	render() {
		let { simulation } = this.props;
		let { isOpen } = this.state;
		return (
			<div className={`lotto-simulation ${isOpen ? "lotto-simulation--active" : ""}`} onClick={() => this.handleOpenClick()}>
				<h2 className={`lotto-simulation__title ${isOpen ? "lotto-simulation__title--active" : ""}`} >Lotto</h2>
				<div className={`lotto-simulation__sub-title-container ${isOpen ? "lotto-simulation__sub-title-container--active" : ""}`}>
					<p className={`lotto-simulation__sub-title`}>Choose Numbers</p>
					<button className={`lotto-simulation__lucky-dip-button`} onClick={(e) => this.handleLuckyDipClick(e)}>Lucky Dip</button>
				</div>
				<div className={`lotto-simulation__numbers-container ${isOpen ? "lotto-simulation__numbers-container--active" : ""}`}>
					{simulation.numbersChosen.map((key, index) => {
						return <LottoNumberOption key={index} value={simulation.numbersChosen[index]} />;
					})}

				</div>
			</div>
		);
	}
}