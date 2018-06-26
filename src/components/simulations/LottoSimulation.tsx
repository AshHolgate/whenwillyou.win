import * as React from "react";
import LottoNumberOption from "./LottoNumberOption";
import { Draw, IsSimulating, SimulationHistory } from "../../models/Simulation";
require("./LottoSimulation.scss");

export interface LottoSimulationDataProps {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	isSimulating: boolean;
	isVisible: boolean;
}

export interface LottoSimulationDispatchProps {
	onSelectedNumbersChange: (newNumbers: (number | null)[]) => void;
	onSimulationInit: (simulating: IsSimulating) => void;
	onUpdateLottoDraws: (newDraws: Draw[]) => void;
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
		if (this.props.isSimulating) return false;
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
		return;
	}

	handleLuckyDipClick(e: React.MouseEvent<HTMLElement>) {
		if (!this.state.isOpen) return;
		e.stopPropagation();
		let newNumbers = this.generateLuckyDip();
		this.props.onSelectedNumbersChange(newNumbers);
	}

	generateLuckyDip() {
		let newLuckyDip = [];
		for (let i = 0; i < 6; i++) {
			let newNumber = Math.floor((Math.random() * 60) + 1);
			if (newLuckyDip.indexOf(newNumber) === -1) {
				newLuckyDip.push(newNumber);
			} else {
				i--;
			}
		}
		newLuckyDip.sort(function (a: number, b: number) { return a - b; });
		return newLuckyDip;
	}

	generateNewDraw() {
		let newDraw = [];
		for (let i = 0; i < 6; i++) {
			let newNumber = Math.floor((Math.random() * 60) + 1);
			if (newDraw.indexOf(newNumber) === -1) {
				newDraw.push(newNumber);
			} else {
				i--;
			}
		}
		newDraw.sort(function (a: number, b: number) { return a - b; });
		let newBonusNumber = Math.floor((Math.random() * 60) + 1);
		newDraw.push(newBonusNumber);
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
		let sortedNumbers = this.props.lottoNumbersChosen.sort(function (a: number, b: number) { return a - b; });
		this.props.onSelectedNumbersChange(sortedNumbers);
	}

	handleEndSimulationClick(e: React.MouseEvent<HTMLElement>) {
		let newDraws = this.calculateNewDraws();
		e.stopPropagation();
		this.props.onUpdateLottoDraws(newDraws);
	}

	calculateNewDraws() {
		let currentDraws = this.props.lottoDraws;
		currentDraws.pop();
		let newDrawIndex = 0;
		if (this.props.lottoDraws[0].drawNumber === null) newDrawIndex = 1;
		else newDrawIndex = this.props.lottoDraws[0].drawNumber! + 1;
		let newDrawNumbers = this.generateNewDraw();
		let newDrawMatches = this.calculateMatches(newDrawNumbers);
		let newDrawWinnings = this.calculateWinnings(newDrawMatches);
		currentDraws.unshift({drawNumber: newDrawIndex, numbersDrawn: newDrawNumbers, winnings: newDrawWinnings});
		return currentDraws;
	}

	calculateMatches(simulation: number[]) {
		let numberOfMatches = 0;
		for (let i = 0; i < 6; i++) {
			if (this.props.lottoNumbersChosen.indexOf(simulation[i]) + 1) {
				numberOfMatches++;
			}
		}
		return numberOfMatches;
	}

	calculateWinnings(matches: number) {
		if (matches <= 1) {
			return null;
		}
		if (matches === 2) {
			return 2.5;
		}
		if (matches === 3) {
			return 25;
		}
		if (matches === 4) {
			return 123;
		}
		if (matches === 5) {
			return 1457;
		}
		if (matches === 6) {
			return 22000000;
		}
		return 0;
	}

	handleSelectedNumberChange(value: number | null, index: number) {
		if (isNaN(value!)) value = null;
		let newNumbers = this.props.lottoNumbersChosen.slice();
		newNumbers[index] = value;
		this.props.onSelectedNumbersChange(newNumbers);
	}

	checkIfArrayIsUnique(arr: (number | null)[]) {
		let myArray = arr;
		for (let i = 0; i < myArray.length; i++) {
			if (myArray.indexOf(myArray[i]) !== myArray.lastIndexOf(myArray[i])) {
				return false;
			}
		}
		return true;
	}

	addDaysToDate(date: Date, days: number) {
		let result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
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
		let { lottoNumbersChosen, isVisible, isSimulating, lottoDraws } = this.props;
		let { isOpen, chosenNumbersValid } = this.state;
		return (
			<div
				className={`lotto-simulation ${isOpen ? "lotto-simulation--open" : ""}
				${isSimulating ? "lotto-simulation--simulating" : ""}
				${isVisible ? "" : "lotto-simulation--hidden"}`}
				onClick={() => this.handleOpenClick()}>

				<h2 className={`lotto-simulation__title ${isOpen ? "lotto-simulation__title--open" : ""} ${isSimulating ? "lotto-simulation__title--hidden" : ""}`} >Lotto</h2>
				<div className={`lotto-simulation__simulation-options-container
					${isOpen ? "lotto-simulation__simulation-options-container--open" : ""}
					${isSimulating ? "lotto-simulation__simulation-options-container--hidden" : ""}`}>

					<div className={`lotto-simulation__sub-title-container ${isOpen ? "lotto-simulation__sub-title-container--open" : ""}`}>
						<p className={`lotto-simulation__sub-title`}>Choose Numbers</p>
						<button className={`lotto-simulation__lucky-dip-button`} onClick={(e) => this.handleLuckyDipClick(e)}>Lucky Dip</button>
						<button className={`lotto-simulation__lucky-dip-button`} onClick={(e) => this.handleClearClick(e)}>Clear</button>
					</div>
				</div>
				<div className={`lotto-simulation__simulation-numbers-container ${isOpen ? "lotto-simulation__simulation-numbers-container--open" : ""}`}>
					<div className={`lotto-simulation__numbers-container`}>
						{lottoNumbersChosen.map((key, index) => {
							return <LottoNumberOption key={index} value={lottoNumbersChosen[index]} index={index}
								onChange={(value, index) => this.handleSelectedNumberChange(value, index)} disabled={isSimulating} />;
						})}

					</div>
				</div>
				<div className={`lotto-simulation__main-container ${isOpen ? "lotto-simulation__main-container--open" : ""} ${isSimulating ? "lotto-simulation__main-container--simulating" : ""}`}>
					<div className={`lotto-simulation__pre-simulation-container ${isSimulating ? "lotto-simulation__pre-simulation-container--simulating" : ""}`}>
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
					<div className={`lotto-simulation__during-simulation-container ${isSimulating ? "lotto-simulation__during-simulation-container--simulating" : ""}`}>
						<div className="lotto-simulation__simulation-draws-container">
							<div className="lotto-simulation__draws-main-container">
								<div className="lotto-simulation__draw-row">
									<p className="lotto-simulation__draw-id lotto-simulation__draw-id--title">Draw</p>
									<p className="lotto-simulation__draw-numbers lotto-simulation__draw-numbers--title">Numbers</p>
									<p className="lotto-simulation__draw-winnings lotto-simulation__draw-winnings--title">Winnings</p>
								</div>
								{lottoDraws.map((key, index) => {
									return <div key={index} className="lotto-simulation__draw-row">
										<p className="lotto-simulation__draw-id lotto-simulation__draw-id--title">{key.drawNumber}</p>
										<p className="lotto-simulation__draw-numbers lotto-simulation__draw-numbers--title">{key.numbersDrawn}</p>
										<p className="lotto-simulation__draw-winnings lotto-simulation__draw-winnings--title">{key.winnings}</p>
									</div>;
								})}
							</div>
						</div>
						<div className={`lotto-simulation__start-simulation-button ${chosenNumbersValid ? "lotto-simulation__start-simulation-button--open" : ""}`}
							onClick={(e) => this.handleEndSimulationClick(e)}>
							<p className="lotto-simulation__start-simulation-button-text">Add</p>
							<p className="lotto-simulation__start-simulation-button-text">Simulation</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}