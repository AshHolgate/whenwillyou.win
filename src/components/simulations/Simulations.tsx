import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulation from "./LottoSimulation";
import { Draw, SimulationHistory, SimulationStatus } from "../../models/Simulation";
// import EuromillionsSimulation from "./EuromillionsSimulation";
require("./Simulations.scss");

export interface SimulationsStoreProps {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	simulationStatus: SimulationStatus;
	isLottoSimulationOpen: boolean;
	areLottoChosenNumbersValid: boolean;
}

export interface SimulationsDispatchProps {
	onLottoSelectedNumbersChange: (newNumbers: (number | null)[], areNumbersValid: boolean) => void;
	onUpdateSimulationStatus: (simulationStatus: SimulationStatus) => void;
	handleLottoOpenClick: (lottoShouldBeOpen: boolean) => void;
	onUpdateLottoDraws: (newDraws: Draw[]) => void;
}

export type SimulationsProps = SimulationsStoreProps & SimulationsDispatchProps;

export default class Simulations extends React.Component<SimulationsProps> {
	render() {
		let { lottoNumbersChosen, lottoDraws, lottoKeyFacts, lottoSimulationHistory, onLottoSelectedNumbersChange, onUpdateLottoDraws,
			onUpdateSimulationStatus, simulationStatus, isLottoSimulationOpen, areLottoChosenNumbersValid, handleLottoOpenClick } = this.props;
		return (
			<div className="simulations">
				<Divider title="Simulations" />
				<LottoSimulation
					lottoNumbersChosen={lottoNumbersChosen}
					lottoDraws={lottoDraws}
					lottoKeyFacts={lottoKeyFacts}
					lottoSimulationHistory={lottoSimulationHistory}
					onUpdateDraws={(newDraws: Draw[]) => onUpdateLottoDraws(newDraws)}
					handleOpenClick={(shouldBeOpen: boolean) => handleLottoOpenClick(shouldBeOpen)}
					onSelectedNumbersChange={(newNumbers: (number | null)[], areNumbersValid: boolean) => onLottoSelectedNumbersChange(newNumbers, areNumbersValid)}
					updateSimulationStatus={(simulating: SimulationStatus) => onUpdateSimulationStatus(simulating)}
					isSimulating={simulationStatus === 1}
					isVisible={simulationStatus === 0 || simulationStatus === 1}
					isOpen={isLottoSimulationOpen}
					chosenNumbersValid={areLottoChosenNumbersValid}
				/>
				{/* <EuromillionsSimulation
					lottoNumbersChosen={lottoNumbersChosen}
					lottoDraws={lottoDraws}
					lottoKeyFacts={lottoKeyFacts}
					lottoSimulationHistory={lottoSimulationHistory}
					onUpdateDraws={(newDraws: Draw[]) => onUpdateLottoDraws(newDraws)}
					handleOpenClick={(shouldBeOpen: boolean) => handleLottoOpenClick(shouldBeOpen)}
					onSelectedNumbersChange={(newNumbers: (number | null)[], areNumbersValid: boolean) => onLottoSelectedNumbersChange(newNumbers, areNumbersValid)}
					updateSimulationStatus={(simulating: SimulationStatus) => onUpdateSimulationStatus(simulating)}
					isSimulating={simulationStatus === 1}
					isVisible={simulationStatus === 0 || simulationStatus === 2}
					isOpen={isLottoSimulationOpen}
					chosenNumbersValid={areLottoChosenNumbersValid}
				/> */}
			</div>
		);
	}
}