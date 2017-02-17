import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from '../styles/App.scss'

class App extends Component {
  render () {
    var linkStyle = {
      padding: 5,
      lineHeight: 2
    }
    var navCls = classNames(
      'nav',
      {
        [styles.homeNav]: this.props.location.pathname === '/'
      }
    )
    return (
      <div>
        <ul className={navCls}>
          <Link to="/" style={linkStyle} onlyActiveOnIndex={true} activeClassName={styles.activeNavItem}>Home</Link>
        </ul>
        <div className={styles.container}>
          {/* test sass vars import */}
          {/* styles.color */}
          {this.props.children}
        </div>
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
