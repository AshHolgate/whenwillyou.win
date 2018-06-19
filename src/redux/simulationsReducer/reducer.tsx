import { reducerWithInitialState } from "typescript-fsa-reducers";
import SimulationData from "../../models/Simulation";

export interface SimulationsReducerState {
	lottoSimulation: SimulationData;
}

const initialState: SimulationsReducerState = {
	lottoSimulation: {
		numbersChosen: [
			1,
			2,
			null,
			null,
			null,
			null
		],
		draws: [],
		keyFacts: []
	}
};

const reducer = reducerWithInitialState(initialState);

export default reducer;