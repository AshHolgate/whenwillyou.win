import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulation from "./LottoSimulation";
import { Draw, IsSimulating, SimulationHistory } from "../../models/Simulation";
require("./Simulations.scss");

export interface SimulationsStoreProps {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	isSimulating: IsSimulating;
}

export interface SimulationsDispatchProps {
	onLottoSelectedNumbersChange: (newNumbers: (number | null)[]) => void;
	onSimulationInit: (simulating: IsSimulating) => void;
	onUpdateLottoDraws: (newDraws: Draw[]) => void;
}

export type SimulationsProps = SimulationsStoreProps & SimulationsDispatchProps;

export default class Simulations extends React.Component<SimulationsProps> {
	render() {
		let { lottoNumbersChosen, lottoDraws, lottoKeyFacts, lottoSimulationHistory, onLottoSelectedNumbersChange, onUpdateLottoDraws, onSimulationInit, isSimulating } = this.props;
		return (
			<div className="simulations">
				<Divider title="Simulations" />
				<LottoSimulation
					lottoNumbersChosen={lottoNumbersChosen}
					lottoDraws={lottoDraws}
					lottoKeyFacts={lottoKeyFacts}
					lottoSimulationHistory={lottoSimulationHistory}
					onUpdateLottoDraws={(newDraws: Draw[]) => onUpdateLottoDraws(newDraws)}
					onSelectedNumbersChange={(newNumbers: (number | null)[]) => onLottoSelectedNumbersChange(newNumbers)}
					onSimulationInit={(simulating: IsSimulating) => onSimulationInit(simulating)}
					isSimulating={isSimulating === 1}
					isVisible={isSimulating === 0 || isSimulating === 1} />
			</div>
		);
	}
}