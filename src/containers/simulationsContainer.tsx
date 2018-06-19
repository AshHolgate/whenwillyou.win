import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations from "../components/simulations/Simulations";
import { lottoSimulationSelector } from "../redux/simulationsReducer/selectors";
import { changeLottoSelectedNumberAction } from "../redux/simulationsReducer/actions";

const mapStateToProps = (store: WhenWillYouWinStore) => ({
	lottoSimulation: lottoSimulationSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	onLottoSelectedNumberChange: (value: number[]): void => { dispatch(changeLottoSelectedNumberAction({ value })); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);