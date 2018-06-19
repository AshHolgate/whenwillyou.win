import { createStore, combineReducers } from "redux";
import simulationsReducer, { SimulationsReducerState } from "./simulationsReducer/reducer";

export interface WhenWillYouWinStore {
	simulationsReducer: SimulationsReducerState;
}

const reducers = combineReducers<WhenWillYouWinStore>({
	simulationsReducer
});

const store = createStore<WhenWillYouWinStore, any, null, null >(
	reducers,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;