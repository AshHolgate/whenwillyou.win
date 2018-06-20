import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulation from "./LottoSimulation";
import { Draw } from "../../models/Simulation";
require("./Simulations.scss");

export interface SimulationsStoreProps {
	lottoNumbersChosen: (number|null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
}

export interface SimulationsDispatchProps {
	onLottoSelectedNumbersChange: (newNumbers: (number|null)[]) => void;
}

export type SimulationsProps = SimulationsStoreProps & SimulationsDispatchProps;

export default class Simulations extends React.Component<SimulationsProps> {
	render() {
		let { lottoNumbersChosen, lottoDraws, lottoKeyFacts, onLottoSelectedNumbersChange } = this.props;
		return(
			<div className="simulations">
				<Divider title="Simulations" />
				<LottoSimulation
					lottoNumbersChosen={lottoNumbersChosen}
					lottoDraws={lottoDraws}
					lottoKeyFacts={lottoKeyFacts}
					onSelectedNumbersChange={(newNumbers: (number|null)[]) => onLottoSelectedNumbersChange(newNumbers)}/>
			</div>
		);
	}
}