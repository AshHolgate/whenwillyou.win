import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Draw, SimulationHistory, SimulationStatus } from "../../models/Simulation";
import { changeLottoSelectedNumberAction, onUpdateLottoDrawsAction, onUpdateSimulationStatusAction, onLottoOpenAction } from "./actions";

export interface SimulationsReducerState {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	simulationStatus: SimulationStatus;
	isLottoSimulationOpen: boolean;
	areLottoChosenNumbersValid: boolean;
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
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null }
	],
	lottoKeyFacts: [],
	lottoSimulationHistory: { draws: 0, years: 0, months: 0, days: 0, dayCycleCount: 0, spent: 0, won: 0 },
	simulationStatus: SimulationStatus.notSimulating,
	isLottoSimulationOpen: false,
	areLottoChosenNumbersValid: false
};

const reducer = reducerWithInitialState(initialState)
	.case(onLottoOpenAction, (state, payload) => ({ ...state, isLottoSimulationOpen: payload.value }))
	.case(changeLottoSelectedNumberAction, (state, payload) => ({ ...state, lottoNumbersChosen: payload.value, areLottoChosenNumbersValid: payload.areNumbersValid }))
	.case(onUpdateLottoDrawsAction, (state, payload) => ({ ...state, lottoDraws: payload.draws }))
	.case(onUpdateSimulationStatusAction, (state, payload) => ({ ...state, simulationStatus: payload.value }));

export default reducer;