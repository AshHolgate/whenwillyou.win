import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations, { SimulationsDispatchProps, SimulationsStoreProps } from "../components/simulations/Simulations";
import { lottoNumbersChosenSelector, lottoDrawsSelector, lottoKeyFactsSelector, isSimulatingSelector, lottoSimulationHistorySelector } from "../redux/simulationsReducer/selectors";
import { changeLottoSelectedNumberAction, onSimulationInitAction, onUpdateLottoDrawsAction } from "../redux/simulationsReducer/actions";
import { IsSimulating, Draw } from "../models/Simulation";

const mapStateToProps = (store: WhenWillYouWinStore): SimulationsStoreProps => ({
	lottoNumbersChosen: lottoNumbersChosenSelector(store),
	lottoDraws: lottoDrawsSelector(store),
	lottoKeyFacts: lottoKeyFactsSelector(store),
	lottoSimulationHistory: lottoSimulationHistorySelector(store),
	isSimulating: isSimulatingSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch): SimulationsDispatchProps => ({
	onLottoSelectedNumbersChange: (value: (number|null)[]): void => { dispatch(changeLottoSelectedNumberAction({ value })); },
	onUpdateLottoDraws: (value: Draw[]): void => { dispatch(onUpdateLottoDrawsAction({ value })); },
	onSimulationInit: (value: IsSimulating): void => { dispatch(onSimulationInitAction({ value })); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);