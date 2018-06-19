import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

// fetch leads
export interface ChangeLottoSelectedNumberPayload { value: (number|null)[]; }
export const changeLottoSelectedNumberAction = actionCreator<ChangeLottoSelectedNumberPayload>("SIMULATIONS_REDUCER_CHANGE_LOTTO_SELECTED_NUMBER");