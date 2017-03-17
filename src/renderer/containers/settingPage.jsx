import { connect }                  from 'react-redux'
import SettingPage                  from '../components/settingPage'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        db: state.db
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetLocalCredentials: () => {
            return dispatch(Actions.getLocalCredentials())
        },
        onGetMyProfile: () => {
            return dispatch(Actions.getMyProfile())
        },
        onGetRxDB: (dbName) => {
            return dispatch(Actions.connectRxDB(dbName))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
