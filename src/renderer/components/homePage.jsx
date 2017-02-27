import React    from 'react'
import { Link }                     from 'react-router'

export default class HomePage extends React.Component {
  componentDidMount () {
    this.props.onGetLocalCredentials()
  }
  render () {
    return (
      <div className="home">
        <h2>Hello, StarCabinet</h2>
        <p>Welcome... {this.props.credentials.password}</p>
      </div>
    )
  }
}
