import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import * as ReactGA from "react-ga";
import Simulations, { SimulationsDispatchProps, SimulationsStoreProps } from "../components/simulations/Simulations";
import {
	lottoNumbersChosenSelector, lottoDrawsSelector, lottoKeyFactsSelector, lottoSimulationHistorySelector,
	isLottoSimulationOpenSelector, areLottoChosenNumbersValidSelector, simulationStatusSelector, euromillionsNumbersChosenSelector, euromillionsDrawsSelector,
	euromillionsKeyFactsSelector, euromillionsSimulationHistorySelector, isEuromillionsSimulationOpenSelector, areEuromillionsChosenNumbersValidSelector
} from "../redux/simulationsReducer/selectors";
import {
	changeLottoSelectedNumberAction, onUpdateLottoDrawsAction, onUpdateSimulationStatusAction, onLottoOpenAction, changeEuromillionsSelectedNumberAction,
	onUpdateEuromillionsDrawsAction, onEuromillionsOpenAction
} from "../redux/simulationsReducer/actions";
import { Draw, SimulationStatus } from "../models/Simulation";

const mapStateToProps = (store: WhenWillYouWinStore): SimulationsStoreProps => ({
	lottoNumbersChosen: lottoNumbersChosenSelector(store),
	lottoDraws: lottoDrawsSelector(store),
	lottoKeyFacts: lottoKeyFactsSelector(store),
	lottoSimulationHistory: lottoSimulationHistorySelector(store),
	isLottoSimulationOpen: isLottoSimulationOpenSelector(store),
	areLottoChosenNumbersValid: areLottoChosenNumbersValidSelector(store),
	euromillionsNumbersChosen: euromillionsNumbersChosenSelector(store),
	euromillionsDraws: euromillionsDrawsSelector(store),
	euromillionsKeyFacts: euromillionsKeyFactsSelector(store),
	euromillionsSimulationHistory: euromillionsSimulationHistorySelector(store),
	isEuromillionsSimulationOpen: isEuromillionsSimulationOpenSelector(store),
	areEuromillionsChosenNumbersValid: areEuromillionsChosenNumbersValidSelector(store),
	simulationStatus: simulationStatusSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch): SimulationsDispatchProps => ({
	onLottoSelectedNumbersChange: (value: (number | null)[], areNumbersValid): void => { dispatch(changeLottoSelectedNumberAction({ value, areNumbersValid })); },
	onUpdateLottoDraws: (draws: Draw[]): void => { dispatch(onUpdateLottoDrawsAction({ draws })); },
	handleLottoOpenClick: (value: boolean): void => { dispatch(onLottoOpenAction({ value })); },
	onEuromillionsSelectedNumbersChange: (value: (number | null)[], areNumbersValid): void => { dispatch(changeEuromillionsSelectedNumberAction({ value, areNumbersValid })); },
	onUpdateEuromillionsDraws: (draws: Draw[]): void => { dispatch(onUpdateEuromillionsDrawsAction({ draws })); },
	handleEuromillionsOpenClick: (value: boolean): void => { dispatch(onEuromillionsOpenAction({ value })); },
	onUpdateSimulationStatus: (value: SimulationStatus): void => {
		dispatch(onUpdateSimulationStatusAction({ value }));
		if (value === 1) {
			ReactGA.event({
				category: "Simulations",
				action: "Lotto Simulation"
			});
		}
		if (value === 2) {
			ReactGA.event({
				category: "Simulations",
				action: "Euromillions Simulation"
			});
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);