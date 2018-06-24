
import { WhenWillYouWinStore } from "../store";

export const lottoNumbersChosenSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoNumbersChosen;
export const lottoDrawsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoDraws;
export const lottoKeyFactsSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.lottoKeyFacts;
export const isSimulatingSelector = (store: WhenWillYouWinStore) => store.simulationsReducer.isSimulating;