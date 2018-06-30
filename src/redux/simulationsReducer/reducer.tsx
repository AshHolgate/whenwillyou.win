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
	lottoSimulationHistory: { draws: 0, currentDrawDate: new Date(), day: 0, month: 0, year: 0, dayCycleCount: 3, spent: 0, won: 0 },
	simulationStatus: SimulationStatus.notSimulating,
	isLottoSimulationOpen: false,
	areLottoChosenNumbersValid: false
};

const calculateHistory = (draws: Draw[], history: SimulationHistory) => {
	if (draws[0].drawNumber === null) {
		let blankHistory = { draws: 0, currentDrawDate: new Date(), day: 0, month: 0, year: 0, dayCycleCount: 3, spent: 0, won: 0 };
		return blankHistory;
	}
	history = Object.assign({}, history);
	let currentDraw = draws[0];
	history.spent += 2.5;
	history.won += currentDraw.winnings ? currentDraw.winnings : 0;
	history.currentDrawDate.setDate(history.currentDrawDate.getDate() + history.dayCycleCount);
	let now = new Date();
	let difference = (history.currentDrawDate as any) - (now as any);
	let elapsedDate = new Date(difference);
	history.day = elapsedDate.getDate();
	history.month = elapsedDate.getMonth() + 1;
	history.year = elapsedDate.getFullYear() - 1970;
	history.dayCycleCount = history.dayCycleCount === 3 ? 4 : 3;
	history.draws += 1;
	return history;
};

const reducer = reducerWithInitialState(initialState)
	.case(onLottoOpenAction, (state, payload) => ({ ...state, isLottoSimulationOpen: payload.value }))
	.case(changeLottoSelectedNumberAction, (state, payload) => ({ ...state, lottoNumbersChosen: payload.value, areLottoChosenNumbersValid: payload.areNumbersValid }))
	.case(onUpdateLottoDrawsAction, (state, payload) => ({ ...state, lottoDraws: payload.draws, lottoSimulationHistory: calculateHistory(payload.draws, state.lottoSimulationHistory)}))
	.case(onUpdateSimulationStatusAction, (state, payload) => ({ ...state, simulationStatus: payload.value }));

export default reducer;