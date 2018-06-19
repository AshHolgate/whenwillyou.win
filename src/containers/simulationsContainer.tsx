import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations, { SimulationsDispatchProps } from "../components/simulations/Simulations";
import { lottoSimulationSelector } from "../redux/simulationsReducer/selectors";
import { changeLottoSelectedNumberAction } from "../redux/simulationsReducer/actions";

const mapStateToProps = (store: WhenWillYouWinStore) => ({
	lottoSimulation: lottoSimulationSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): SimulationsDispatchProps => ({
	onLottoSelectedNumbersChange: (value: (number|null)[]): void => { dispatch(changeLottoSelectedNumberAction({ value })); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);