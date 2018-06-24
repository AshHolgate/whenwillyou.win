import * as React from "react";
import LottoNumberOption from "./LottoNumberOption";
import { Draw, IsSimulating } from "../../models/Simulation";
require("./LottoSimulation.scss");

export interface LottoSimulationDataProps {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	isSimulating: boolean;
	isVisible: boolean;
}

export interface LottoSimulationDispatchProps {
	onSelectedNumbersChange: (newNumbers: (number | null)[]) => void;
	onSimulationInit: (simulating: IsSimulating) => void;
}

export type LottoSimulationProps = LottoSimulationDataProps & LottoSimulationDispatchProps;

export interface LottoSimulationState {
	isOpen: boolean;
	chosenNumbersValid: boolean;
}

export default class LottoSimulation extends React.Component<LottoSimulationProps, LottoSimulationState> {
	constructor(props: LottoSimulationProps) {
		super(props);
		this.state = {
			isOpen: false,
			chosenNumbersValid: false
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
		let newNumbers = this.generateNewDraw();
		this.props.onSelectedNumbersChange(newNumbers);
	}

	generateNewDraw() {
		let newDraw = [];
		for (let i = 0; i <= 5; i++) {
			let newNumber = Math.floor((Math.random() * 60) + 1);
			if (newDraw.indexOf(newNumber) === -1) {
				newDraw.push(newNumber);
			} else {
				i--;
			}
		}
		newDraw.sort(function (a: number, b: number) { return a - b; });
		return newDraw;
	}

	handleClearClick(e: React.MouseEvent<HTMLElement>) {
		if (!this.state.isOpen) return;
		e.stopPropagation();
		let newNumbers: (number | null)[] = [null, null, null, null, null, null];
		this.props.onSelectedNumbersChange(newNumbers);
	}

	handleStartSimulationClick(e: React.MouseEvent<HTMLElement>) {
		if (!this.state.chosenNumbersValid) return;
		e.stopPropagation();
		this.props.onSimulationInit(1);
	}

	handleSelectedNumberChange(value: number | null, index: number) {
		if (isNaN(value!)) value = null;
		let newNumbers = this.props.lottoNumbersChosen.slice();
		newNumbers[index] = value;
		this.props.onSelectedNumbersChange(newNumbers);
	}

	checkIfArrayIsUnique(arr: (number | null)[]) {
		var myArray = arr;

		for (var i = 0; i < myArray.length; i++) {
			if (myArray.indexOf(myArray[i]) !== myArray.lastIndexOf(myArray[i])) {
				return false;
			}
		}

		return true;
	}

	componentDidUpdate() {
		let chosenNumbers = this.props.lottoNumbersChosen;
		let areChosenNumbersValid = true;
		areChosenNumbersValid = this.checkIfArrayIsUnique(chosenNumbers);
		if (chosenNumbers.indexOf(null) >= 0) {
			areChosenNumbersValid = false;
		}
		if (this.state.chosenNumbersValid !== areChosenNumbersValid) {
			this.setState({ chosenNumbersValid: areChosenNumbersValid });
		}
	}

	render() {
		let { lottoNumbersChosen, isVisible, isSimulating } = this.props;
		let { isOpen, chosenNumbersValid } = this.state;
		return (
			<div
				className={`lotto-simulation ${isOpen ? "lotto-simulation--open" : ""}
				${isSimulating ? "lotto-simulation--simulating" : ""}
				${isVisible ? "" : "lotto-simulation--hidden"}`}
				onClick={() => this.handleOpenClick()}>

				<h2 className={`lotto-simulation__title ${isOpen ? "lotto-simulation__title--open" : ""}`} >Lotto</h2>
				<div className={`lotto-simulation__simulation-options-container ${isOpen ? "lotto-simulation__simulation-options-container--open" : ""}`}>
					<div className={`lotto-simulation__sub-title-container ${isOpen ? "lotto-simulation__sub-title-container--open" : ""}`}>
						<p className={`lotto-simulation__sub-title`}>Choose Numbers</p>
						<button className={`lotto-simulation__lucky-dip-button`} onClick={(e) => this.handleLuckyDipClick(e)}>Lucky Dip</button>
						<button className={`lotto-simulation__lucky-dip-button`} onClick={(e) => this.handleClearClick(e)}>Clear</button>
					</div>
					<div className={`lotto-simulation__numbers-container`}>
						{lottoNumbersChosen.map((key, index) => {
							return <LottoNumberOption key={index} value={lottoNumbersChosen[index]} index={index}
								onChange={(value, index) => this.handleSelectedNumberChange(value, index)} />;
						})}

					</div>
					<div className={`lotto-simulation__data-organisation-container ${isOpen ? "lotto-simulation__data-organisation-container--open" : ""}`}>
						<div className="lotto-simulation__description-container">
							<p className="lotto-simulation__description-container-title">
								Description
						</p>
							<p className="lotto-simulation__description-container-content">
								The National Lottery is the state-franchised national lottery in the United Kingdom.
						</p>
							<p className="lotto-simulation__description-container-content">
								The chance of winning the jackpot is 1 in 45,057,474, the chance of winning any prize is 1 in 54.
						</p>
						</div>
						<div className="lotto-simulation__winnings-container">
							<p className="lotto-simulation__winnings-container-title">
								Prizes
						</p>
							<p className="lotto-simulation__winnings-container-content">
								6 - £5,057,464.00
						</p>
							<p className="lotto-simulation__winnings-container-content">
								5 + Bonus - £35,942.00
						</p>
							<p className="lotto-simulation__winnings-container-content">
								5 - £1,455.00
						</p>
							<p className="lotto-simulation__winnings-container-content">
								4 - £140.00
						</p>
							<p className="lotto-simulation__winnings-container-content">
								3 - £25.00
						</p>
							<p className="lotto-simulation__winnings-container-content">
								2 - £2.50
						</p>
						</div>
					</div>
					<div className={`lotto-simulation__start-simulation-button ${chosenNumbersValid ? "lotto-simulation__start-simulation-button--open" : ""}`}
						onClick={(e) => this.handleStartSimulationClick(e)}>
						<p className="lotto-simulation__start-simulation-button-text">Start New</p>
						<p className="lotto-simulation__start-simulation-button-text">Simulation</p>
					</div>
				</div>
			</div>
		);
	}
}