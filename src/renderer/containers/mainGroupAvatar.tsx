import { connect } from "react-redux";
import MainGroupAvatar from "../components/mainGroupAvatar";

// Redux connection
const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

const mapDispatchToProps = _dispatch => {
    return {};
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainGroupAvatar);
