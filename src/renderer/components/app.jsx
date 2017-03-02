import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import offlineTitle                 from '../utils/offlineTitle'
import '../styles/global/global.scss'

export default class App extends React.Component {
  componentDidMount () {
    this.props.listenNetworkChange()
  }

  componentWillUnmount () {
    this.props.diListenNetworkChange()
  }

  componentWillReceiveProps (nextProps) {
    offlineTitle(nextProps.offline)
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
