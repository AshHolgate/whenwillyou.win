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
		let areChosenNumbersValid = this.checkIfArrayIsUnique(chosenNumbers);
		if (chosenNumbers.indexOf(null) >= 0) {
			areChosenNumbersValid = false;
		}
		return areChosenNumbersValid;
	}

	checkIfArrayIsUnique(numbers: (number | null)[]) {
		let chosenMainNumbers = numbers.slice(0, 5);
		let chosenStarNumbers = numbers.slice(5, 7);
		for (let i = 0; i <= chosenMainNumbers.length; i++) {
			if (chosenMainNumbers.indexOf(chosenMainNumbers[i]) !== chosenMainNumbers.lastIndexOf(chosenMainNumbers[i])) {
				return false;
			}
		}
		for (let i = 0; i <= chosenStarNumbers.length; i++) {
			if (chosenStarNumbers.indexOf(chosenStarNumbers[i]) !== chosenStarNumbers.lastIndexOf(chosenStarNumbers[i])) {
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
		return this.generateNewDraw();
	}

	generateNewDraw() {
		let newMainNumbers = [];
		let newStarNumbers = [];
		for (let i = 0; i < 5; i++) {
			let newNumber = Math.floor((Math.random() * 50) + 1);
			if (newMainNumbers.indexOf(newNumber) === -1) {
				newMainNumbers.push(newNumber);
			} else {
				i--;
			}
		}
		newMainNumbers.sort(function (a: number, b: number) { return a - b; });
		for (let i = 0; i < 2; i++) {
			let newNumber = Math.floor((Math.random() * 12) + 1);
			if (newStarNumbers.indexOf(newNumber) === -1) {
				newStarNumbers.push(newNumber);
			} else {
				i--;
			}
		}
		newStarNumbers.sort(function (a: number, b: number) { return a - b; });
		let newDraw = newMainNumbers.concat(newStarNumbers);
		return newDraw;
	}

	handleClearClick(e: React.MouseEvent<HTMLElement>) {
		if (!this.props.isOpen) return;
		e.stopPropagation();
		let newNumbers: (number | null)[] = [null, null, null, null, null, null, null];
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

		this.props.updateSimulationStatus(2);
		let numbersChosen = this.props.euromillionsNumbersChosen;
		this.updateChosenNumbers(numbersChosen);
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
		let chosenMainNumbers = this.props.euromillionsNumbersChosen.slice(0, 5);
		let chosenStarNumbers = this.props.euromillionsNumbersChosen.slice(5, 7);
		let simulationMainNumbers = simulation.slice(0, 5);
		let simulationStarNumbers = simulation.slice(5, 7);
		for (let i = 0; i <= chosenMainNumbers.length; i++) {
			if (chosenMainNumbers.indexOf(simulationMainNumbers[i]) >= 0) {
				numberOfMatches++;
			}
		}
		for (let i = 0; i <= simulationStarNumbers.length; i++) {
			if (chosenStarNumbers.indexOf(simulationStarNumbers[i]) >= 0) {
				numberOfMatches += 0.1;
			}
		}
		return numberOfMatches;
	}

	calculateWinnings(matches: number) {
		if (matches === 1.2) {
			return 6.59;
		}
		if (matches === 2) {
			return 2.73;
		}
		if (matches === 2.1) {
			return 5.04;
		}
		if (matches === 2.2) {
			return 12.29;
		}
		if (matches === 3) {
			return 7.62;
		}
		if (matches === 3.1) {
			return 9.10;
		}
		if (matches === 3.2) {
			return 68.54;
		}
		if (matches === 4) {
			return 37.33;
		}
		if (matches === 4.1) {
			return 106.35;
		}
		if (matches === 4.2) {
			return 2169.20;
		}
		if (matches === 5) {
			return 37772.30;
		}
		if (matches === 5.1) {
			return 232448.96;
		}
		if (matches === 5.2) {
			return 49645209.77;
		}
		return null;
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
							return <EuromillionsNumberOption key={index} value={euromillionsNumbersChosen[index]} index={index} isLuckyStar={index >= 5}
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
									EuroMillions is a transnational lottery requiring 7 correct numbers to win the jackpot.
								</p>
								<p className="euromillions-simulation__description-container-content">
									Choose 5 numbers between 1-50, and 2 "Lucky Stars" between 1-12, to begin playing.
								</p>
							</div>
							<div className="euromillions-simulation__winnings-container">
								<p className="euromillions-simulation__winnings-container-title">
									Matches
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									5+2★ = £49,645,209.77
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									5+1★ = £232,448.96
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									5 = £37,702.30
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									4+2★ = £2169.20
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									4+1★ = £106.35
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									3+2★ = £68.54
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									4 = £37.33
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									2+2★ = £12.29
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									3+1★ = £9.10
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									3 = £7.62
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									1+2★ = £6.59
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									2+1★ = £5.04
								</p>
								<p className="euromillions-simulation__winnings-container-content">
									2 = £2.73
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
									let mainNumbersDrawn = draw.numbersDrawn.slice(0, 5);
									let starNumbersDrawn = draw.numbersDrawn.slice(5, 7);
									let mainNumbersChosen = this.props.euromillionsNumbersChosen.slice(0, 5);
									let starNumbersChosen = this.props.euromillionsNumbersChosen.slice(5, 7);
									return <div key={index} className="euromillions-simulation__draw-row">
										<p className="euromillions-simulation__draw-id euromillions-simulation__draw-id">{draw.drawNumber}</p>
										<div className="euromillions-simulation__drawn-numbers-container">
											{mainNumbersDrawn.map((drawnNumber, i) => {
												let match = false;
												if (mainNumbersChosen.indexOf(drawnNumber) >= 0) match = true;
												return <p key={i} className={`euromillions-simulation__drawn-number ${match ? "euromillions-simulation__drawn-number--match" : ""}
													${i === 4 ? "euromillions-simulation__drawn-number--end" : ""}`}>{drawnNumber}</p>;
											})}
											{starNumbersDrawn.map((drawnNumber, i) => {
												let match = false;
												if (starNumbersChosen.indexOf(drawnNumber) >= 0) match = true;
												return <p key={i} className={`euromillions-simulation__drawn-number
													${match ? "euromillions-simulation__drawn-number--match" : ""}`}>{drawnNumber}</p>;
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