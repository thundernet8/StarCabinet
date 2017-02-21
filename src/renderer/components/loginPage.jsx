import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import styles                       from '../styles/login.scss'
import FontAwesome                  from 'react-fontawesome'
import * as EVENTS                  from '../../shared/events'
import { ipcRenderer }              from 'electron'
import { Input, Icon, Button }      from 'antd'

export default class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      username: this.props.credentials.username,
      password: this.props.credentials.password
    }
  }
  emitUsernameEmpty = (e) => {
    this.userNameInput.focus()
    this.setState({
      username: ''
    })
  }
  emitPasswordEmpty = () => {
    this.passwordInput.focus()
    this.setState({
      password: ''
    })
  }
  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  enterSubmit = (e) => {
    this.setState({ submitting: true })
    this.props.onRequestLogin()
  }
  closeLoginWindow () {
    ipcRenderer.sendSync(EVENTS.CLOSE_LOGIN, '')
  }
  render () {
    const { submitting } = this.state
    const { username, password } = this.props.accounts
    const usernameSuffix = username ? <Icon type="close-circle" onClick={this.emitUsernameEmpty} /> : null
    const passwordSuffix = password ? <Icon type="close-circle" onClick={this.emitPasswordEmpty} /> : null
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
              <div className="mt20">
                <Input
                  size="large"
                  placeholder="Github UserName"
                  prefix={<Icon type="user" />}
                  suffix={usernameSuffix}
                  value={username}
                  onChange={this.onChangeUserName}
                  ref={ (node) => { this.userNameInput = node } }
                />
              </div>
              <div className="mt10">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  prefix={<Icon type="lock" />}
                  suffix={passwordSuffix}
                  value={password}
                  onChange={this.onChangePassword}
                  ref={ (node) => { this.passwordInput = node } }
                />
              </div>
              <div className="mt30">
                <Button className={styles.loginBtn} size="large" type="primary" loading={submitting} onClick={this.enterSubmit} ref={ (node) => { this.submitBtn = node } }>
                  {submitting ? '' : 'Login'}
                </Button>
              </div>
            </div>
        </div>
    )
  }
}
