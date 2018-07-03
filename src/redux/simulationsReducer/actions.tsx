import actionCreatorFactory from "typescript-fsa";
import { Draw, SimulationStatus } from "../../models/Simulation";

const actionCreator = actionCreatorFactory();

// lotto simulation
export interface OnLottoOpenPayload { value: boolean; }
export const onLottoOpenAction = actionCreator<OnLottoOpenPayload>("SIMULATIONS_REDUCER_ON_LOTTO_OPEN");
export interface ChangeLottoSelectedNumberPayload { value: (number|null)[]; areNumbersValid: boolean; }
export const changeLottoSelectedNumberAction = actionCreator<ChangeLottoSelectedNumberPayload>("SIMULATIONS_REDUCER_CHANGE_LOTTO_SELECTED_NUMBER");
export interface OnUpdateLottoDrawsPayload { draws: Draw[]; }
export const onUpdateLottoDrawsAction = actionCreator<OnUpdateLottoDrawsPayload>("SIMULATIONS_REDUCER_ON_UPDATE_LOTTO_DRAWS");

// euromillions simulation
export interface OnEuromillionsOpenPayload { value: boolean; }
export const onEuromillionsOpenAction = actionCreator<OnEuromillionsOpenPayload>("SIMULATIONS_REDUCER_ON_EUROMILLIONS_OPEN");
export interface ChangeEuromillionsSelectedNumberPayload { value: (number|null)[]; areNumbersValid: boolean; }
export const changeEuromillionsSelectedNumberAction = actionCreator<ChangeEuromillionsSelectedNumberPayload>("SIMULATIONS_REDUCER_CHANGE_EUROMILLIONS_SELECTED_NUMBER");
export interface OnUpdateEuromillionsDrawsPayload { draws: Draw[]; }
export const onUpdateEuromillionsDrawsAction = actionCreator<OnUpdateEuromillionsDrawsPayload>("SIMULATIONS_REDUCER_ON_UPDATE_EUROMILLIONS_DRAWS");

// simulation status
export interface OnUpdateSimulationStatusPayload { value: SimulationStatus; }
export const onUpdateSimulationStatusAction = actionCreator<OnUpdateSimulationStatusPayload>("SIMULATIONS_REDUCER_ON_UPDATE_SIMULATION_STATUS");