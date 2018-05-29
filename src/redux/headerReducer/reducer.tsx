import { reducerWithInitialState } from "typescript-fsa-reducers";

export interface HeaderState {
	menuOpen: boolean;
}

const initialState: HeaderState = {
	menuOpen: false
};

const reducer = reducerWithInitialState(initialState);

export default reducer;