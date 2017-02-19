import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import styles                       from '../styles/Login.scss'
import FontAwesome                  from 'react-fontawesome'
import * as EVENTS                  from '../../shared/events'
import { ipcRenderer }              from 'electron'

export default class LoginPage extends React.Component {
  closeLoginWindow () {
    ipcRenderer.sendSync(EVENTS.CLOSE_LOGIN, '')
  }
  render () {
    return (
        <div className={styles.wrapper}>
            <header>
              <div>StarCabinet</div>
              <span id="closeLogin" className={styles.close} onClick={this.closeLoginWindow}><i></i><i></i></span>
            </header>
            <div className={styles.logoWrapper}>
              <img className={styles.logo} src={require('../assets/images/icon.png')}/>
            </div>
            <div className={styles.loginBox}>
              Loginbox
            </div>
        </div>
    )
  }
}
