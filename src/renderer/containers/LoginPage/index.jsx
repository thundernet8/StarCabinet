import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import styles from '../../styles/Login.scss'
import FontAwesome from 'react-fontawesome'

class LoginPage extends Component {
  render () {
    return (
        <div className={styles.wrapper}>
            <header>
              <div>StarCabinet</div>
              <span id="closeLogin" className={styles.close}><i></i><i></i></span>
            </header>
            <div className={styles.logoWrapper}>
              <img className={styles.logo} src={require('../../assets/images/icon.png')}/>
            </div>
            <div className={styles.loginBox}>
              Loginbox
            </div>
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
})(LoginPage)
