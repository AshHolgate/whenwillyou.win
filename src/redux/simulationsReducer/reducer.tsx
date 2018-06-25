import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Draw, IsSimulating } from "../../models/Simulation";
import { changeLottoSelectedNumberAction, onSimulationInitAction } from "./actions";

export interface SimulationsReducerState {
	lottoNumbersChosen: (number|null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	isSimulating: IsSimulating;
}

const initialState: SimulationsReducerState = {
	lottoNumbersChosen: [
		null,
		null,
		null,
		null,
		null,
		null
	],
	lottoDraws: [
		{numbersDrawn: [], winnings: null},
		{numbersDrawn: [], winnings: null},
		{numbersDrawn: [], winnings: null},
		{numbersDrawn: [], winnings: null},
		{numbersDrawn: [], winnings: null}
	],
	lottoKeyFacts: [],
	isSimulating: 0
};

const reducer = reducerWithInitialState(initialState)
	.case(changeLottoSelectedNumberAction, (state, payload) => ({ ...state, lottoNumbersChosen: payload.value }))
	.case(onSimulationInitAction, (state, payload) => ({ ...state, isSimulating: payload.value }));

export default reducer;