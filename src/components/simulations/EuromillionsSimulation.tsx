import * as React from "react";
import EuromillionsNumberOption from "./EuromillionsNumberOption";
import { Draw, SimulationStatus, SimulationHistory } from "../../models/Simulation";
require("./EuromillionsSimulation.scss");

export interface EuromillionsSimulationDataProps {
	euromillionsNumbersChosen: (number | null)[];
	euromillionsDraws: Draw[];
	euromillionsKeyFacts: string[];
	euromillionsSimulationHistory: SimulationHistory;
	isSimulating: boolean;
	isVisible: boolean;
	isOpen: boolean;
	chosenNumbersValid: boolean;
}

export interface EuromillionsSimulationDispatchProps {
	onSelectedNumbersChange: (newNumbers: (number | null)[], areNumbersValid: boolean) => void;
	handleOpenClick: (shouldBeOpen: boolean) => void;
	updateSimulationStatus: (simulationStatus: SimulationStatus) => void;
	onUpdateDraws: (newDraws: Draw[]) => void;
}

export interface EuromillionsSimulationState {
	shouldAutoSimulate: boolean;
}

export type EuromillionsSimulationProps = EuromillionsSimulationDataProps & EuromillionsSimulationDispatchProps;

export default class EuromillionsSimulation extends React.Component<EuromillionsSimulationProps, EuromillionsSimulationState> {
	constructor(props: EuromillionsSimulationProps) {
		super(props);
		this.state = {
			shouldAutoSimulate: false
		};
	}

	updateChosenNumbers(newNumbers: (number | null)[]) {
		let areNumbersValid = this.areChosenNumbersValid(newNumbers);
		this.props.onSelectedNumbersChange(newNumbers, areNumbersValid);
	}

	areChosenNumbersValid(chosenNumbers: (number | null)[]) {
		let areChosenNumbersValid = true;
		areChosenNumbersValid = this.checkIfArrayIsUnique(chosenNumbers);
		if (chosenNumbers.indexOf(null) >= 0) {
			areChosenNumbersValid = false;
		}
		return areChosenNumbersValid;
	}

	checkIfArrayIsUnique(numbers: (number | null)[]) {
		let chosenNumbers = numbers;
		for (let i = 0; i < chosenNumbers.length; i++) {
			if (chosenNumbers.indexOf(chosenNumbers[i]) !== chosenNumbers.lastIndexOf(chosenNumbers[i])) {
				return false;
			}
		}
		return true;
	}

	handleOpenClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		if (this.props.isSimulating) return;
		else this.props.handleOpenClick(!this.props.isOpen);
	}

	handleLuckyDipClick(e: React.MouseEvent<HTMLElement>) {
		if (!this.props.isOpen) return;
		e.stopPropagation();
		let newNumbers = this.generateLuckyDip();
		this.updateChosenNumbers(newNumbers);
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
		if (!this.props.isOpen) return;
		e.stopPropagation();
		let newNumbers: (number | null)[] = [null, null, null, null, null, null];
		this.updateChosenNumbers(newNumbers);
	}

	handleInitiateSimulationClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		if (!this.props.chosenNumbersValid) return;
		window.setTimeout(() => {
			this.setState((prevState, props) => {
				return { shouldAutoSimulate: true };
			});
		}, 500);

		this.props.updateSimulationStatus(1);
		let sortedNumbers = this.props.euromillionsNumbersChosen.sort(function (a: number, b: number) { return a - b; });
		this.updateChosenNumbers(sortedNumbers);
	}

	handleEndSimulationClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		this.setState((prevState, props) => {
			return { shouldAutoSimulate: false };
		});
		this.props.updateSimulationStatus(0);
		let blankDraws = [{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null }];
		this.props.onUpdateDraws(blankDraws);
	}

	draw() {
		let newDraws = this.calculateNewDraws();
		this.props.onUpdateDraws(newDraws);
	}

	calculateNewDraws() {
		let currentDraws = this.props.euromillionsDraws.slice();
		currentDraws.pop();
		let newDrawNumbers = this.generateNewDraw();
		let newDrawMatches = this.calculateMatches(newDrawNumbers);
		let newDrawWinnings = this.calculateWinnings(newDrawMatches);
		currentDraws.unshift({ drawNumber: this.props.euromillionsSimulationHistory.draws + 1, numbersDrawn: newDrawNumbers, winnings: newDrawWinnings });
		return currentDraws;
	}

	calculateMatches(simulation: number[]) {
		let numberOfMatches = 0;
		for (let i = 0; i < 6; i++) {
			if (this.props.euromillionsNumbersChosen.indexOf(simulation[i]) >= 0) {
				numberOfMatches++;
			}
		}
		if (numberOfMatches === 5) {
			if (this.props.euromillionsNumbersChosen.indexOf(simulation[6]) >= 0) {
				numberOfMatches = 5.1;
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
			return 140;
		}
		if (matches === 5) {
			return 1455;
		}
		if (matches === 5.1) {
			return 35942;
		}
		if (matches === 6) {
			return 5057464;
		}
		return 0;
	}

	handleSelectedNumberChange(value: number | null, index: number) {
		if (isNaN(value!)) value = null;
		let newNumbers = this.props.euromillionsNumbersChosen.slice();
		newNumbers[index] = value;
		this.updateChosenNumbers(newNumbers);
	}

	addDaysToDate(date: Date, days: number) {
		let result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	handlePauseSimulationClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		this.setState((prevState, props) => {
			return { shouldAutoSimulate: !this.state.shouldAutoSimulate };
		});
	}

	componentDidUpdate() {
		window.requestAnimationFrame(() => {
			if (this.state.shouldAutoSimulate) this.draw();
		});
		
	}

	render() {
		let { euromillionsNumbersChosen, isVisible, isSimulating, euromillionsDraws, isOpen, chosenNumbersValid, euromillionsSimulationHistory } = this.props;
		let { shouldAutoSimulate } = this.state;
		return (
			<div
				className={`euromillions-simulation ${isOpen ? "euromillions-simulation--open" : ""}
				${isSimulating ? "euromillions-simulation--simulating" : ""}
				${isVisible ? "" : "euromillions-simulation--hidden"}`}
				onClick={(e) => this.handleOpenClick(e)}>

				<h2 className={`euromillions-simulation__title ${isOpen ? "euromillions-simulation__title--open" : ""} ${isSimulating ? "euromillions-simulation__title--hidden" : ""}`} >Euromillions</h2>
				<div className={`euromillions-simulation__simulation-options-container ${isOpen ? "euromillions-simulation__simulation-options-container--open" : ""}
					${isSimulating ? "euromillions-simulation__simulation-options-container--hidden" : ""}`}>

					<div className={`euromillions-simulation__sub-title-container ${isOpen ? "euromillions-simulation__sub-title-container--open" : ""}`}>
						<p className={`euromillions-simulation__sub-title`}>Choose Numbers</p>
						<button className={`euromillions-simulation__lucky-dip-button`} onClick={(e) => this.handleLuckyDipClick(e)}>Lucky Dip</button>
						<button className={`euromillions-simulation__lucky-dip-button`} onClick={(e) => this.handleClearClick(e)}>Clear</button>
					</div>
				</div>
				<div className={`euromillions-simulation__simulation-numbers-container ${isOpen ? "euromillions-simulation__simulation-numbers-container--open" : ""}`}>
					<div className={`euromillions-simulation__numbers-container`}>
						{euromillionsNumbersChosen.map((key, index) => {
							return <EuromillionsNumberOption key={index} value={euromillionsNumbersChosen[index]} index={index}
								onChange={(value, index) => this.handleSelectedNumberChange(value, index)} disabled={isSimulating} />;
						})}

					</div>
				</div>
				<div className={`euromillions-simulation__main-container ${isOpen ? "euromillions-simulation__main-container--open" : ""}
					${isSimulating ? "euromillions-simulation__main-container--simulating" : ""}`}>
					<div className={`euromillions-simulation__pre-simulation-container ${isSimulating ? "euromillions-simulation__pre-simulation-container--simulating" : ""}`}>
						<div className={`euromillions-simulation__data-organisation-container ${isOpen ? "euromillions-simulation__data-organisation-container--open" : ""}`}>
							<div className="euromillions-simulation__description-container">
								<p className="euromillions-simulation__description-container-title">
									Description
						</p>
								<p className="euromillions-simulation__description-container-content">
									The National Lottery is the state-franchised national lottery in the United Kingdom.
						</p>
								<p className="euromillions-simulation__description-container-content">
									The chance of winning the jackpot is 1 in 45,057,474, the chance of winning any prize is 1 in 54.
						</p>
							</div>
							<div className="euromillions-simulation__winnings-container">
								<p className="euromillions-simulation__winnings-container-title">
									Prizes
						</p>
								<p className="euromillions-simulation__winnings-container-content">
									6 - £5,057,464.00
						</p>
								<p className="euromillions-simulation__winnings-container-content">
									5 + Bonus - £35,942.00
						</p>
								<p className="euromillions-simulation__winnings-container-content">
									5 - £1,455.00
						</p>
								<p className="euromillions-simulation__winnings-container-content">
									4 - £140.00
						</p>
								<p className="euromillions-simulation__winnings-container-content">
									3 - £25.00
						</p>
								<p className="euromillions-simulation__winnings-container-content">
									2 - £2.50
						</p>
							</div>
						</div>
						<div className={`euromillions-simulation__start-simulation-button ${chosenNumbersValid ? "euromillions-simulation__start-simulation-button--open" : ""}`}
							onClick={(e) => this.handleInitiateSimulationClick(e)}>
							<p className="euromillions-simulation__simulation-button-text">Start New</p>
							<p className="euromillions-simulation__simulation-button-text">Simulation</p>
						</div>
					</div>
					<div className={`euromillions-simulation__during-simulation-container ${isSimulating ? "euromillions-simulation__during-simulation-container--simulating" : ""}`}>
						<div className="euromillions-simulation__simulation-draws-container">
							<div className="euromillions-simulation__draws-main-container">
								<div className="euromillions-simulation__draw-row">
									<p className="euromillions-simulation__draw-id euromillions-simulation__draw-id--title">Draw</p>
									<p className="euromillions-simulation__draw-numbers euromillions-simulation__draw-numbers-title">Numbers</p>
									<p className="euromillions-simulation__draw-winnings euromillions-simulation__draw-winnings--title">Winnings</p>
								</div>
								{euromillionsDraws.map((draw, index) => {
									return <div key={index} className="euromillions-simulation__draw-row">
										<p className="euromillions-simulation__draw-id euromillions-simulation__draw-id">{draw.drawNumber}</p>
										<div className="euromillions-simulation__drawn-numbers-container">
											{draw.numbersDrawn.map((drawnNumber, index) => {
												let match = false;
												if (euromillionsNumbersChosen.indexOf(drawnNumber) >= 0) match = true;
												return <p key={index} className={`euromillions-simulation__drawn-number ${match ? "euromillions-simulation__drawn-number--match" : ""}
													${index === 6 ? "euromillions-simulation__drawn-number--bonus" : ""}`}>{drawnNumber}</p>;
											})}
										</div>
										<p className="euromillions-simulation__draw-winnings euromillions-simulation__draw-winnings">{draw.winnings ? "£" + draw.winnings.toFixed(2) : ""}</p>
									</div>;
								})}
							</div>
							<div className="euromillions-simulation__simulation-information-container">
								<div className="euromillions-simulation__simulation-information-row">
									<div className="euromillions-simulation__simulation-information-top-container">
										<p className="euromillions-simulation__simulation-information-top-title euromillions-simulation__simulation-information-top-title--draws">Draws</p>
										<div className="euromillions-simulation__simulation-information-top-data-container euromillions-simulation__simulation-information-top-data-container--draws">
											<p className="euromillions-simulation__simulation-information-top-data">{euromillionsSimulationHistory.draws}</p>
										</div>
									</div>
									<div className="euromillions-simulation__simulation-information-top-container">
										<p className="euromillions-simulation__simulation-information-top-title euromillions-simulation__simulation-information-top-title--day">Day</p>
										<div className="euromillions-simulation__simulation-information-top-data-container euromillions-simulation__simulation-information-top-data-container--day">
											<p className="euromillions-simulation__simulation-information-top-data">{euromillionsSimulationHistory.day}</p>
										</div>
									</div>
									<div className="euromillions-simulation__simulation-information-top-container">
										<p className="euromillions-simulation__simulation-information-top-title euromillions-simulation__simulation-information-top-title--month">Month</p>
										<div className="euromillions-simulation__simulation-information-top-data-container euromillions-simulation__simulation-information-top-data-container--month">
											<p className="euromillions-simulation__simulation-information-top-data">{euromillionsSimulationHistory.month}</p>
										</div>
									</div>
									<div className="euromillions-simulation__simulation-information-top-container">
										<p className="euromillions-simulation__simulation-information-top-title euromillions-simulation__simulation-information-top-title--year">Year</p>
										<div className="euromillions-simulation__simulation-information-top-data-container euromillions-simulation__simulation-information-top-data-container--year">
											<p className="euromillions-simulation__simulation-information-top-data">{euromillionsSimulationHistory.year}</p>
										</div>
									</div>
								</div>
								<div className="euromillions-simulation__simulation-information-row">
									<div className="euromillions-simulation__simulation-information-bottom-container euromillions-simulation__simulation-information-bottom-container--spent">
										<p className="euromillions-simulation__simulation-information-bottom-title">Spent</p>
										<p className="euromillions-simulation__simulation-information-bottom-data">£{euromillionsSimulationHistory.spent.toFixed(2)}</p>
									</div>
									<div className="euromillions-simulation__simulation-information-bottom-container euromillions-simulation__simulation-information-bottom-container--won">
										<p className="euromillions-simulation__simulation-information-bottom-title">Won</p>
										<p className="euromillions-simulation__simulation-information-bottom-data">£{euromillionsSimulationHistory.won.toFixed(2)}</p>
									</div>
								</div>
								<div className="euromillions-simulation__simulation-information-row">
									<div className="euromillions-simulation__simulation-information-bottom-container euromillions-simulation__simulation-information-bottom-container--balance">
										<p className="euromillions-simulation__simulation-information-bottom-title">Balance</p>
										<p className="euromillions-simulation__simulation-information-bottom-data">£{(euromillionsSimulationHistory.won - euromillionsSimulationHistory.spent).toFixed(2)}</p>
									</div>
								</div>
							</div>
						</div>
						<div className={`euromillions-simulation__pause-simulation-button ${chosenNumbersValid ? "euromillions-simulation__pause-simulation-button--open" : ""}`}
							onClick={(e) => this.handlePauseSimulationClick(e)}>
							<p className="euromillions-simulation__simulation-button-text">{shouldAutoSimulate ? "Pause" : "Resume"}</p>
							<p className="euromillions-simulation__simulation-button-text">Simulation</p>
						</div>
						<div className={`euromillions-simulation__end-simulation-button ${chosenNumbersValid ? "euromillions-simulation__start-simulation-button--open" : ""}`}
							onClick={(e) => this.handleEndSimulationClick(e)}>
							<p className="euromillions-simulation__simulation-button-text">End</p>
							<p className="euromillions-simulation__simulation-button-text">Simulation</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}