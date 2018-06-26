import actionCreatorFactory from "typescript-fsa";
import { Draw, SimulationStatus } from "../../models/Simulation";

const actionCreator = actionCreatorFactory();

export interface OnLottoOpenPayload { value: boolean; }
export const onLottoOpenAction = actionCreator<OnLottoOpenPayload>("SIMULATIONS_REDUCER_ON_LOTTO_OPEN");
export interface ChangeLottoSelectedNumberPayload { value: (number|null)[]; areNumbersValid: boolean; }
export const changeLottoSelectedNumberAction = actionCreator<ChangeLottoSelectedNumberPayload>("SIMULATIONS_REDUCER_CHANGE_LOTTO_SELECTED_NUMBER");
export interface OnUpdateLottoDrawsPayload { value: Draw[]; }
export const onUpdateLottoDrawsAction = actionCreator<OnUpdateLottoDrawsPayload>("SIMULATIONS_REDUCER_ON_UPDATE_LOTTO_DRAWS");
export interface OnUpdateSimulationStatusPayload { value: SimulationStatus; }
export const onUpdateSimulationStatusAction = actionCreator<OnUpdateSimulationStatusPayload>("SIMULATIONS_REDUCER_ON_UPDATE_SIMULATION_STATUS");