import { WhenWillYouWinStore } from "../store";
import SimulationData from "../../models/Simulation";

export const lottoSimulationSelector = (store: WhenWillYouWinStore): SimulationData => store.simulationsReducer.lottoSimulation;
export const lottoSelectedNumbersSelector = (store: WhenWillYouWinStore): (number|null)[] => store.simulationsReducer.lottoSimulation.numbersChosen;