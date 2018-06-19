import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations from "../components/simulations/Simulations";
import { lottoSimulationSelector } from "../redux/simulationsReducer/selectors";

const mapStateToProps = (store: WhenWillYouWinStore) => ({
	lottoSimulation: lottoSimulationSelector(store)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);