import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

// Redux connection

// Which props to inject from the global atomic state
export default connect((state) => {
  return {
    data: state.mainReducer // see renderer/index.js line19-
  }
})(App)
