import { connect }                  from 'react-redux'
import MainGroupNavs                from '../components/mainGroupNavs'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        category: state.category,
        languages: state.languages,
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainGroupNavs)
