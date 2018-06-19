import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Simulations from "../components/simulations/Simulations";

const mapStateToProps = (store: WhenWillYouWinStore) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Simulations);