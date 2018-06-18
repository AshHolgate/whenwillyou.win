import { createStore, combineReducers } from "redux";

export interface WhenWillYouWinStore {
}

const reducers = combineReducers<WhenWillYouWinStore>({
	
});

const store = createStore<WhenWillYouWinStore, any, any, any>(
	reducers
);

export default store;