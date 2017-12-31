import { connect } from "react-redux";
import MainGroupPane from "../components/mainGroupPane";

// Redux connection
const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainGroupPane);
