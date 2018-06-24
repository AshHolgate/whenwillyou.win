import actionCreatorFactory from "typescript-fsa";
import { IsSimulating } from "../../models/Simulation";

const actionCreator = actionCreatorFactory();

export interface ChangeLottoSelectedNumberPayload { value: (number|null)[]; }
export const changeLottoSelectedNumberAction = actionCreator<ChangeLottoSelectedNumberPayload>("SIMULATIONS_REDUCER_CHANGE_LOTTO_SELECTED_NUMBER");
export interface OnSimulationInitPayload { value: IsSimulating; }
export const onSimulationInitAction = actionCreator<OnSimulationInitPayload>("SIMULATIONS_REDUCER_ON_SIMULATION_INIT");