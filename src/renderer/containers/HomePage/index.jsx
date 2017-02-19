import React, { Component }         from 'react'
import { Link }                     from 'react-router'
import { connect }                  from 'react-redux'

class HomePage extends Component {
  render () {
    return (
      <div className="home">
        <h2>Hello, StarCabinet</h2>
        <p>Welcome... {this.props.data.name}</p>
      </div>
    )
  }
}

// Redux connection

// Which props to inject from the global atomic state
export default connect((state) => {
  return {
    data: state.mainReducer.data
  }
})(HomePage)
