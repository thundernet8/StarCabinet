import React                        from 'react'
import { Link }                     from 'react-router'

export default class MainPage extends React.Component {
  componentDidMount () {
    this.props.onGetLocalCredentials()
  }
  render () {
    return (
      <div className="main">
        <header id="titleBar"/>
        <h2>Hello, StarCabinet</h2>
        <p>Welcome... {this.props.credentials.password}</p>
      </div>
    )
  }
}
