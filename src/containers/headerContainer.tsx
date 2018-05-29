import { WhenWillYouWinStore } from "../redux/store";
import { Dispatch, connect } from "react-redux";
import Header from "../components/shared/Header";

const mapStateToProps = (store: WhenWillYouWinStore) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);