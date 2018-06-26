import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations, { SimulationsDispatchProps, SimulationsStoreProps } from "../components/simulations/Simulations";
import { lottoNumbersChosenSelector, lottoDrawsSelector, lottoKeyFactsSelector, lottoSimulationHistorySelector,
	isLottoSimulationOpenSelector, areLottoChosenNumbersValidSelector, simulationStatusSelector } from "../redux/simulationsReducer/selectors";
import { changeLottoSelectedNumberAction, onUpdateLottoDrawsAction, onUpdateSimulationStatusAction, onLottoOpenAction } from "../redux/simulationsReducer/actions";
import { Draw, SimulationStatus } from "../models/Simulation";

const mapStateToProps = (store: WhenWillYouWinStore): SimulationsStoreProps => ({
	lottoNumbersChosen: lottoNumbersChosenSelector(store),
	lottoDraws: lottoDrawsSelector(store),
	lottoKeyFacts: lottoKeyFactsSelector(store),
	lottoSimulationHistory: lottoSimulationHistorySelector(store),
	simulationStatus: simulationStatusSelector(store),
	isLottoSimulationOpen: isLottoSimulationOpenSelector(store),
	areLottoChosenNumbersValid: areLottoChosenNumbersValidSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch): SimulationsDispatchProps => ({
	onLottoSelectedNumbersChange: (value: (number|null)[], areNumbersValid): void => { dispatch(changeLottoSelectedNumberAction({ value, areNumbersValid })); },
	onUpdateLottoDraws: (value: Draw[]): void => { dispatch(onUpdateLottoDrawsAction({ value })); },
	handleLottoOpenClick: (value: boolean): void => { dispatch(onLottoOpenAction({ value })); },
	onUpdateSimulationStatus: (value: SimulationStatus): void => { dispatch(onUpdateSimulationStatusAction({ value })); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);