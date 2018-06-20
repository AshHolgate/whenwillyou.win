import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations, { SimulationsDispatchProps, SimulationsStoreProps } from "../components/simulations/Simulations";
import { lottoSimulationSelector } from "../redux/simulationsReducer/selectors";
import { changeLottoSelectedNumberAction } from "../redux/simulationsReducer/actions";

const mapStateToProps = (store: WhenWillYouWinStore): SimulationsStoreProps => ({
	lottoSimulation: lottoSimulationSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch): SimulationsDispatchProps => ({
	onLottoSelectedNumbersChange: (value: (number|null)[]): void => { dispatch(changeLottoSelectedNumberAction({ value })); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);