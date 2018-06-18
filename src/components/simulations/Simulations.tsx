import * as React from "react";
import Divider from "../shared/Divider";
import LottoSimulationOption from "./LottoSimulationOption";
require("./Simulations.scss");

export interface SimulationsProps {

}

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