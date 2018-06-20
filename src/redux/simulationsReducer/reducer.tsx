import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Draw } from "../../models/Simulation";
import { changeLottoSelectedNumberAction } from "./actions";

export interface SimulationsReducerState {
	lottoNumbersChosen: (number|null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
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
	lottoDraws: [],
	lottoKeyFacts: []
};

const reducer = reducerWithInitialState(initialState)
	.case(changeLottoSelectedNumberAction, (state, payload) => ({ ...state, lottoNumbersChosen: payload.value }));

export default reducer;