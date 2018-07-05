import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulation from "./LottoSimulation";
import { Draw, SimulationHistory, SimulationStatus } from "../../models/Simulation";
import EuromillionsSimulation from "./EuromillionsSimulation";
import { initGA, logPageView } from "../../ReactGA";
require("./Simulations.scss");

export interface SimulationsStoreProps {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	isLottoSimulationOpen: boolean;
	areLottoChosenNumbersValid: boolean;
	euromillionsNumbersChosen: (number | null)[];
	euromillionsDraws: Draw[];
	euromillionsKeyFacts: string[];
	euromillionsSimulationHistory: SimulationHistory;
	isEuromillionsSimulationOpen: boolean;
	areEuromillionsChosenNumbersValid: boolean;
	simulationStatus: SimulationStatus;
}

export interface SimulationsDispatchProps {
	onLottoSelectedNumbersChange: (newNumbers: (number | null)[], areNumbersValid: boolean) => void;
	handleLottoOpenClick: (lottoShouldBeOpen: boolean) => void;
	onUpdateLottoDraws: (newDraws: Draw[]) => void;
	onEuromillionsSelectedNumbersChange: (newNumbers: (number | null)[], areNumbersValid: boolean) => void;
	handleEuromillionsOpenClick: (euromillionsShouldBeOpen: boolean) => void;
	onUpdateEuromillionsDraws: (newDraws: Draw[]) => void;
	onUpdateSimulationStatus: (simulationStatus: SimulationStatus) => void;
}

export type SimulationsProps = SimulationsStoreProps & SimulationsDispatchProps;

export default class Simulations extends React.Component<SimulationsProps> {
	componentDidMount() {
		initGA();
		logPageView();
	}
	
	render() {
		let { lottoNumbersChosen, lottoDraws, lottoKeyFacts, lottoSimulationHistory, onLottoSelectedNumbersChange, onUpdateLottoDraws,
			isLottoSimulationOpen, areLottoChosenNumbersValid, handleLottoOpenClick, euromillionsNumbersChosen, euromillionsDraws,
			euromillionsKeyFacts, euromillionsSimulationHistory, onEuromillionsSelectedNumbersChange, onUpdateEuromillionsDraws, isEuromillionsSimulationOpen,
			areEuromillionsChosenNumbersValid, handleEuromillionsOpenClick, simulationStatus, onUpdateSimulationStatus } = this.props;
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
				<EuromillionsSimulation
					euromillionsNumbersChosen={euromillionsNumbersChosen}
					euromillionsDraws={euromillionsDraws}
					euromillionsKeyFacts={euromillionsKeyFacts}
					euromillionsSimulationHistory={euromillionsSimulationHistory}
					onUpdateDraws={(newDraws: Draw[]) => onUpdateEuromillionsDraws(newDraws)}
					handleOpenClick={(shouldBeOpen: boolean) => handleEuromillionsOpenClick(shouldBeOpen)}
					onSelectedNumbersChange={(newNumbers: (number | null)[], areNumbersValid: boolean) => onEuromillionsSelectedNumbersChange(newNumbers, areNumbersValid)}
					updateSimulationStatus={(simulating: SimulationStatus) => onUpdateSimulationStatus(simulating)}
					isSimulating={simulationStatus === 2}
					isVisible={simulationStatus === 0 || simulationStatus === 2}
					isOpen={isEuromillionsSimulationOpen}
					chosenNumbersValid={areEuromillionsChosenNumbersValid}
				/>
			</div>
		);
	}
}