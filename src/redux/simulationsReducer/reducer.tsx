import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Draw, IsSimulating, SimulationHistory } from "../../models/Simulation";
import { changeLottoSelectedNumberAction, onSimulationInitAction, onUpdateLottoDrawsAction } from "./actions";

export interface SimulationsReducerState {
	lottoNumbersChosen: (number|null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
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
		{drawNumber: null, numbersDrawn: [], winnings: null},
		{drawNumber: null, numbersDrawn: [], winnings: null},
		{drawNumber: null, numbersDrawn: [], winnings: null},
		{drawNumber: null, numbersDrawn: [], winnings: null},
		{drawNumber: null, numbersDrawn: [], winnings: null}
	],
	lottoKeyFacts: [],
	lottoSimulationHistory: {draws: 0, years: 0, months: 0, days: 0, dayCycleCount: 0, spent: 0, won: 0},
	isSimulating: 0
};

const reducer = reducerWithInitialState(initialState)
	.case(changeLottoSelectedNumberAction, (state, payload) => ({ ...state, lottoNumbersChosen: payload.value }))
	.case(onUpdateLottoDrawsAction, (state, payload) => ({ ...state, lottoDraws: payload.value }))
	.case(onSimulationInitAction, (state, payload) => ({ ...state, isSimulating: payload.value }));

export default reducer;