import { connect }                  from 'react-redux'
import ReposList                    from '../components/reposList'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        repos: state.repos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(ReposList)
