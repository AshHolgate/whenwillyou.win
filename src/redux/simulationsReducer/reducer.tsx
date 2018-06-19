import { reducerWithInitialState } from "typescript-fsa-reducers";
import SimulationData from "../../models/Simulation";
import { changeLottoSelectedNumberAction } from "./actions";

export interface SimulationsReducerState {
	lottoSimulation: SimulationData;
}

const initialState: SimulationsReducerState = {
	lottoSimulation: {
		numbersChosen: [
			null,
			null,
			null,
			null,
			null,
			null
		],
		draws: [],
		keyFacts: []
	}
};

const reducer = reducerWithInitialState(initialState)
	.case(changeLottoSelectedNumberAction, (state, payload) => ({ ...state, numbersChosen: payload.value}));

export default reducer;