import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulationOption from "./LottoSimulation";
require("./Simulations.scss");

export interface SimulationsDataProps {

}

export interface SimulationsDispatchProps {

}

export type SimulationsProps = SimulationsDataProps & SimulationsDispatchProps;

export default class Simulations extends React.Component<SimulationsProps> {
	render() {
		return(
			<div className="simulations">
				<Divider title="Simulations" />
				<LottoSimulationOption />
				<LottoSimulationOption />
			</div>
		);
	}
}