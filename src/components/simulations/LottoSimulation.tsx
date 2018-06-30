import * as React from "react";
import LottoNumberOption from "./LottoNumberOption";
import { Draw, SimulationStatus, SimulationHistory } from "../../models/Simulation";
require("./LottoSimulation.scss");

export interface LottoSimulationDataProps {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	isSimulating: boolean;
	isVisible: boolean;
	isOpen: boolean;
	chosenNumbersValid: boolean;
}

export interface LottoSimulationDispatchProps {
	onSelectedNumbersChange: (newNumbers: (number | null)[], areNumbersValid: boolean) => void;
	handleOpenClick: (shouldBeOpen: boolean) => void;
	updateSimulationStatus: (simulationStatus: SimulationStatus) => void;
	onUpdateDraws: (newDraws: Draw[]) => void;
}

export interface LottoSimulationState {
	shouldAutoSimulate: boolean;
}

export type LottoSimulationProps = LottoSimulationDataProps & LottoSimulationDispatchProps;

export default class LottoSimulation extends React.Component<LottoSimulationProps, LottoSimulationState> {
	constructor(props: LottoSimulationProps) {
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
		let sortedNumbers = this.props.lottoNumbersChosen.sort(function (a: number, b: number) { return a - b; });
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
		let currentDraws = this.props.lottoDraws.slice();
		currentDraws.pop();
		let newDrawNumbers = this.generateNewDraw();
		let newDrawMatches = this.calculateMatches(newDrawNumbers);
		let newDrawWinnings = this.calculateWinnings(newDrawMatches);
		currentDraws.unshift({ drawNumber: this.props.lottoSimulationHistory.draws + 1, numbersDrawn: newDrawNumbers, winnings: newDrawWinnings });
		return currentDraws;
	}

	calculateMatches(simulation: number[]) {
		let numberOfMatches = 0;
		for (let i = 0; i < 6; i++) {
			if (this.props.lottoNumbersChosen.indexOf(simulation[i]) >= 0) {
				numberOfMatches++;
			}
		}
		if (numberOfMatches === 5) {
			if (this.props.lottoNumbersChosen.indexOf(simulation[6]) >= 0) {
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
		let newNumbers = this.props.lottoNumbersChosen.slice();
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

	componentDidMount() {
		window.setInterval(() => {
			if (this.state.shouldAutoSimulate) this.draw();
		}, 20);
	}

	render() {
		let { lottoNumbersChosen, isVisible, isSimulating, lottoDraws, isOpen, chosenNumbersValid, lottoSimulationHistory } = this.props;
		let { shouldAutoSimulate } = this.state;
		return (
			<div
				className={`lotto-simulation ${isOpen ? "lotto-simulation--open" : ""}
				${isSimulating ? "lotto-simulation--simulating" : ""}
				${isVisible ? "" : "lotto-simulation--hidden"}`}
				onClick={(e) => this.handleOpenClick(e)}>

				<h2 className={`lotto-simulation__title ${isOpen ? "lotto-simulation__title--open" : ""} ${isSimulating ? "lotto-simulation__title--hidden" : ""}`} >Lotto</h2>
				<div className={`lotto-simulation__simulation-options-container ${isOpen ? "lotto-simulation__simulation-options-container--open" : ""}
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
							onClick={(e) => this.handleInitiateSimulationClick(e)}>
							<p className="lotto-simulation__simulation-button-text">Start New</p>
							<p className="lotto-simulation__simulation-button-text">Simulation</p>
						</div>
					</div>
					<div className={`lotto-simulation__during-simulation-container ${isSimulating ? "lotto-simulation__during-simulation-container--simulating" : ""}`}>
						<div className="lotto-simulation__simulation-draws-container">
							<div className="lotto-simulation__draws-main-container">
								<div className="lotto-simulation__draw-row">
									<p className="lotto-simulation__draw-id lotto-simulation__draw-id--title">Draw</p>
									<p className="lotto-simulation__draw-numbers lotto-simulation__draw-numbers-title">Numbers</p>
									<p className="lotto-simulation__draw-winnings lotto-simulation__draw-winnings--title">Winnings</p>
								</div>
								{lottoDraws.map((draw, index) => {
									return <div key={index} className="lotto-simulation__draw-row">
										<p className="lotto-simulation__draw-id lotto-simulation__draw-id">{draw.drawNumber}</p>
										<div className="lotto-simulation__drawn-numbers-container">
											{draw.numbersDrawn.map((drawnNumber, index) => {
												let match = false;
												if (lottoNumbersChosen.indexOf(drawnNumber) >= 0) match = true;
												return <p key={index} className={`lotto-simulation__drawn-number ${match ? "lotto-simulation__drawn-number--match" : ""}
													${index === 6 ? "lotto-simulation__drawn-number--bonus" : ""}`}>{drawnNumber}</p>;
											})}
										</div>
										<p className="lotto-simulation__draw-winnings lotto-simulation__draw-winnings">{draw.winnings ? "£" + draw.winnings.toFixed(2) : ""}</p>
									</div>;
								})}
							</div>
							<div className="lotto-simulation__simulation-information-container">
								<div className="lotto-simulation__simulation-information-row">
									<div className="lotto-simulation__simulation-information-top-container">
										<p className="lotto-simulation__simulation-information-top-title lotto-simulation__simulation-information-top-title--draws">Draws</p>
										<div className="lotto-simulation__simulation-information-top-data-container lotto-simulation__simulation-information-top-data-container--draws">
											<p className="lotto-simulation__simulation-information-top-data">{lottoSimulationHistory.draws}</p>
										</div>
									</div>
									<div className="lotto-simulation__simulation-information-top-container">
										<p className="lotto-simulation__simulation-information-top-title lotto-simulation__simulation-information-top-title--day">Day</p>
										<div className="lotto-simulation__simulation-information-top-data-container lotto-simulation__simulation-information-top-data-container--day">
											<p className="lotto-simulation__simulation-information-top-data">{lottoSimulationHistory.day}</p>
										</div>
									</div>
									<div className="lotto-simulation__simulation-information-top-container">
										<p className="lotto-simulation__simulation-information-top-title lotto-simulation__simulation-information-top-title--month">Month</p>
										<div className="lotto-simulation__simulation-information-top-data-container lotto-simulation__simulation-information-top-data-container--month">
											<p className="lotto-simulation__simulation-information-top-data">{lottoSimulationHistory.month}</p>
										</div>
									</div>
									<div className="lotto-simulation__simulation-information-top-container">
										<p className="lotto-simulation__simulation-information-top-title lotto-simulation__simulation-information-top-title--year">Year</p>
										<div className="lotto-simulation__simulation-information-top-data-container lotto-simulation__simulation-information-top-data-container--year">
											<p className="lotto-simulation__simulation-information-top-data">{lottoSimulationHistory.year}</p>
										</div>
									</div>
								</div>
								<div className="lotto-simulation__simulation-information-row">
									<div className="lotto-simulation__simulation-information-bottom-container lotto-simulation__simulation-information-bottom-container--spent">
										<p className="lotto-simulation__simulation-information-bottom-title">Spent</p>
										<p className="lotto-simulation__simulation-information-bottom-data">£{lottoSimulationHistory.spent.toFixed(2)}</p>
									</div>
									<div className="lotto-simulation__simulation-information-bottom-container lotto-simulation__simulation-information-bottom-container--won">
										<p className="lotto-simulation__simulation-information-bottom-title">Won</p>
										<p className="lotto-simulation__simulation-information-bottom-data">£{lottoSimulationHistory.won.toFixed(2)}</p>
									</div>
								</div>
								<div className="lotto-simulation__simulation-information-row">
									<div className="lotto-simulation__simulation-information-bottom-container lotto-simulation__simulation-information-bottom-container--balance">
										<p className="lotto-simulation__simulation-information-bottom-title">Balance</p>
										<p className="lotto-simulation__simulation-information-bottom-data">£{(lottoSimulationHistory.won - lottoSimulationHistory.spent).toFixed(2)}</p>
									</div>
								</div>
							</div>
						</div>
						<div className={`lotto-simulation__pause-simulation-button ${chosenNumbersValid ? "lotto-simulation__pause-simulation-button--open" : ""}`}
							onClick={(e) => this.handlePauseSimulationClick(e)}>
							<p className="lotto-simulation__simulation-button-text">{shouldAutoSimulate ? "Pause" : "Resume"}</p>
							<p className="lotto-simulation__simulation-button-text">Simulation</p>
						</div>
						<div className={`lotto-simulation__end-simulation-button ${chosenNumbersValid ? "lotto-simulation__start-simulation-button--open" : ""}`}
							onClick={(e) => this.handleEndSimulationClick(e)}>
							<p className="lotto-simulation__simulation-button-text">End</p>
							<p className="lotto-simulation__simulation-button-text">Simulation</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}