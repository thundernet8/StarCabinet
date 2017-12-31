import { connect } from "react-redux";
import MainGroupFooter from "../components/mainGroupFooter";
import Actions from "../actions";
import IState from "../interface/IState";
import { ICategoryCreateResult } from "../interface/ICategory";

export interface MainGroupFooterProps {
    catAdd: ICategoryCreateResult;
    onAddNewCategory: (name: string) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        catAdd: state.catAdd
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNewCategory: name => {
            return dispatch(Actions.addNewCategory(name));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainGroupFooter);
