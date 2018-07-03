import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Draw, SimulationHistory, SimulationStatus } from "../../models/Simulation";
import { changeLottoSelectedNumberAction, onUpdateLottoDrawsAction, onUpdateSimulationStatusAction, onLottoOpenAction, onUpdateEuromillionsDrawsAction,
	changeEuromillionsSelectedNumberAction, onEuromillionsOpenAction } from "./actions";

export interface SimulationsReducerState {
	lottoNumbersChosen: (number | null)[];
	lottoDraws: Draw[];
	lottoKeyFacts: string[];
	lottoSimulationHistory: SimulationHistory;
	isLottoSimulationOpen: boolean;
	areLottoChosenNumbersValid: boolean;
	euromillionsNumbersChosen: (number | null)[];
	euromillionsDraws: Draw[];
	euromillionsKeyFacts: string[];
	euromillionsSimulationHistory: SimulationHistory;
	isEuromillionsSimulationOpen: boolean;
	areEuromillionsChosenNumbersValid: boolean;
	simulationStatus: SimulationStatus;
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
	isLottoSimulationOpen: false,
	areLottoChosenNumbersValid: false,
	euromillionsNumbersChosen: [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	],
	euromillionsDraws: [
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null },
		{ drawNumber: null, numbersDrawn: [], winnings: null }
	],
	euromillionsKeyFacts: [],
	euromillionsSimulationHistory: { draws: 0, currentDrawDate: new Date(), day: 0, month: 0, year: 0, dayCycleCount: 3, spent: 0, won: 0 },
	isEuromillionsSimulationOpen: false,
	areEuromillionsChosenNumbersValid: false,
	simulationStatus: SimulationStatus.notSimulating
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
	.case(onEuromillionsOpenAction, (state, payload) => ({ ...state, isEuromillionsSimulationOpen: payload.value }))
	.case(changeEuromillionsSelectedNumberAction, (state, payload) => ({ ...state, euromillionsNumbersChosen: payload.value, areEuromillionsChosenNumbersValid: payload.areNumbersValid }))
	.case(onUpdateEuromillionsDrawsAction, (state, payload) => ({ ...state, euromillionsDraws: payload.draws,
		euromillionsSimulationHistory: calculateHistory(payload.draws, state.euromillionsSimulationHistory)}))
	.case(onUpdateSimulationStatusAction, (state, payload) => ({ ...state, simulationStatus: payload.value }));

export default reducer;