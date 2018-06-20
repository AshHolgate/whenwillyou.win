import * as React from "react";
import LottoNumberOption from "./LottoNumberOption";
import { Draw } from "../../models/Simulation";
require("./LottoSimulation.scss");

export interface LottoSimulationDataProps {
	lottoNumbersChosen: (number|null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
}

export interface LottoSimulationDispatchProps {
	onSelectedNumbersChange: (newNumbers: (number|null)[]) => void;
}

export type LottoSimulationProps = LottoSimulationDataProps & LottoSimulationDispatchProps;

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

	handleSelectedNumberChange(value: number, index: number) {
		let newNumbers = this.props.lottoNumbersChosen.slice();
		newNumbers[index] = value;
		this.props.onSelectedNumbersChange(newNumbers);
	}

	render() {
		let { lottoNumbersChosen } = this.props;
		let { isOpen } = this.state;
		return (
			<div className={`lotto-simulation ${isOpen ? "lotto-simulation--active" : ""}`} onClick={() => this.handleOpenClick()}>
				<h2 className={`lotto-simulation__title ${isOpen ? "lotto-simulation__title--active" : ""}`} >Lotto</h2>
				<div className={`lotto-simulation__sub-title-container ${isOpen ? "lotto-simulation__sub-title-container--active" : ""}`}>
					<p className={`lotto-simulation__sub-title`}>Choose Numbers</p>
					<button className={`lotto-simulation__lucky-dip-button`} onClick={(e) => this.handleLuckyDipClick(e)}>Lucky Dip</button>
				</div>
				<div className={`lotto-simulation__numbers-container ${isOpen ? "lotto-simulation__numbers-container--active" : ""}`}>
					{lottoNumbersChosen.map((key, index) => {
						return <LottoNumberOption key={index} value={lottoNumbersChosen[index]} index={index}
							onChange={(value, index) => this.handleSelectedNumberChange(value, index)}/>;
					})}

				</div>
			</div>
		);
	}
}