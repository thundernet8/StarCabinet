import React                        from 'react'
import { Link }                     from 'react-router'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import GithubClient                 from '../utils/githubClient'

export default class MainPage extends React.Component {
  getStarredRepos = (credentials) => {
    let github = new GithubClient(credentials)
    github.getStarredRepos((err, res) => {
      if (!err) {
        console.dir(res)
        this.props.onGetRxDB(`${credentials.username}starcabinetdb`)
      } else {
        console.dir(err)
      }
    })
  }
  componentDidMount () {
    this.props.onGetLocalCredentials(this.getStarredRepos)
  }
  render () {
    return (
      <div className={classNames('main', styles.main)}>
        <header id="titleBar"/>
        <h2>Hello, StarCabinet</h2>
        <p>Welcome... {this.props.credentials.password}</p>
      </div>
    )
  }
}
