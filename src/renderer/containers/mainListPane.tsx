import { connect } from "react-redux";
import MainListPane from "../components/mainListPane";

// Redux connection
const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainListPane);
