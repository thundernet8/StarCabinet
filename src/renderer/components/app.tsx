import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'

export default class App extends React.Component<any, any> {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
