import React                        from 'react'
import { Link }                     from 'react-router'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import GithubClient                 from '../utils/githubClient'
import MainGroupPane                from './mainGroupPane'
import MainListPane                 from './mainListPane'
import MainDetailPane               from './mainDetailPane'

export default class MainPage extends React.Component {
  connectRxDB = (credentials) => {
    this.props.onGetRxDB(`scdb4${credentials.username}`) // database name include username to differentiate
  }

  componentWillMount () {
    this.props.onGetLocalCredentials(this.connectRxDB)
  }

  render () {
    return (
      <div className={classNames('main', styles.main)}>
        <header id="titleBar"/>
        <MainGroupPane/>
        <MainListPane/>
        <MainDetailPane/>
      </div>
    )
  }
}
