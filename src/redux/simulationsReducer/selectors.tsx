
import { WhenWillYouWinStore } from "../store";

export const lottoNumbersChosenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoNumbersChosen;
export const lottoDrawsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoDraws;
export const lottoKeyFactsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoKeyFacts;
export const lottoSimulationHistorySelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoSimulationHistory;
export const isLottoSimulationOpenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.isLottoSimulationOpen;
export const areLottoChosenNumbersValidSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.areLottoChosenNumbersValid;

export const euromillionsNumbersChosenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.euromillionsNumbersChosen;
export const euromillionsDrawsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.euromillionsDraws;
export const euromillionsKeyFactsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.euromillionsKeyFacts;
export const euromillionsSimulationHistorySelector = (store: WhenWillYouWinStore) => store.simulationsReducer.euromillionsSimulationHistory;
export const isEuromillionsSimulationOpenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.isEuromillionsSimulationOpen;
export const areEuromillionsChosenNumbersValidSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.areEuromillionsChosenNumbersValid;

export const simulationStatusSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.simulationStatus;