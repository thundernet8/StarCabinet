import React                        from 'react'
import { Link }                     from 'react-router'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import GithubClient                 from '../utils/githubClient'
import MainGroupPane                from './mainGroupPane'
import MainListPane                 from './mainListPane'
import MainDetailPane               from './mainDetailPane'
import deepEqual                    from 'deep-equal'

export default class MainPage extends React.Component {
    connectRxDB = (credentials) => {
        return this.props.onGetRxDB(`scdb4${credentials.username}`) // database name include username to differentiate
    }

    componentWillMount () {
        this.props.onGetLocalCredentials().then((credentials) => {
            return this.connectRxDB(credentials)
        })
        .then((ret) => console.log(ret))
    }

    componentWillReceiveProps (nextProps) {
        // check search/order/filter/category conditions to judge whether the repos list should be updated
        if (!deepEqual(nextProps.search, this.props.search) ||
        !deepEqual(nextProps.order, this.props.order ||
        !deepEqual(nextProps.filter, this.props.filter) ||
        !deepEqual(nextProps.category, this.props.category))) {
            this.props.onNeedUpdateReposList()
        }
    }

    render () {
        return (
            <div className={classNames('main', styles.main)}>
                {/* <header id="titleBar"/> */}
                <section className={classNames('container', styles.container)}>
                    <MainGroupPane/>
                    <MainListPane/>
                    <MainDetailPane/>
                </section>
            </div>
        )
    }
}
