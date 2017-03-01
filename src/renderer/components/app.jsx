import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import '../styles/global/global.scss'

export default class App extends React.Component {
  componentDidMount () {
    this.props.listenNetworkChange()
  }

  componentWillUnmount () {
    this.props.diListenNetworkChange()
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
