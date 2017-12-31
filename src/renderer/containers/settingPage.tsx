import { connect } from "react-redux";
import SettingPage from "../components/settingPage";
import Actions from "../actions";
import IState from "../interface/IState";
import IProfile from "../interface/IProfile";
import { RxDatabase } from "rxdb";

export interface SettingPageProps {
    profile: IProfile;
    db: RxDatabase;
    onGetLocalCredentials: () => void;
    onGetMyProfile: () => void;
    onGetRxDB: (dbName: string) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        profile: state.profile,
        db: state.db
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetLocalCredentials: () => {
            return dispatch(Actions.getLocalCredentials());
        },
        onGetMyProfile: () => {
            return dispatch(Actions.getMyProfile());
        },
        onGetRxDB: dbName => {
            return dispatch(Actions.connectRxDB(dbName));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
