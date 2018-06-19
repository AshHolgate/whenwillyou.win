import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulation from "./LottoSimulation";
import SimulationData from "../../models/Simulation";
require("./Simulations.scss");

export interface SimulationsStoreProps {
	lottoSimulation: SimulationData;
}

export interface SimulationsDispatchProps {

}

export type SimulationsProps = SimulationsStoreProps & SimulationsDispatchProps;

export default class Simulations extends React.Component<SimulationsProps> {
	render() {
		let { lottoSimulation } = this.props;
		return(
			<div className="simulations">
				<Divider title="Simulations" />
				<LottoSimulation simulation={lottoSimulation}/>
			</div>
		);
	}
}