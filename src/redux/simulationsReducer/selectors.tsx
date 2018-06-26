
import { WhenWillYouWinStore } from "../store";

export const lottoNumbersChosenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoNumbersChosen;
export const lottoDrawsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoDraws;
export const lottoKeyFactsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoKeyFacts;
export const lottoSimulationHistorySelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoSimulationHistory;
export const simulationStatusSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.simulationStatus;
export const isLottoSimulationOpenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.isLottoSimulationOpen;
export const areLottoChosenNumbersValidSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.areLottoChosenNumbersValid;