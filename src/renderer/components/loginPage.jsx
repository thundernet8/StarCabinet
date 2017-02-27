import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import styles                                       from '../styles/login.scss'
import FontAwesome                                  from 'react-fontawesome'
import * as EVENTS                                  from '../../shared/events'
import * as SHAREDCONSTANTS                         from '../../shared/constants'
import { ipcRenderer }                              from 'electron'
import { Input, Icon, Button, message }             from 'antd'
import classNames                                   from 'classnames'

message.config({
  top: 60,
  duration: 5
})

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
    if (this.state.submitting) {
      return
    }
    this.userNameInput.focus()
    this.setState({
      username: ''
    })
  }

  emitPasswordEmpty = () => {
    if (this.state.submitting) {
      return
    }
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
    if (this.state.submitting) {
      return
    }
    this.setState({ submitting: true })
    this.props.onRequestLogin({
      username: this.state.username,
      password: this.state.password
    }, this.showLoginMsg)
  }

  showLoginMsg = (success, msg) => {
    if (success) {
      message.success(msg)
    } else {
      message.error(msg)
    }
  }

  closeLoginWindow () {
    ipcRenderer.sendSync(EVENTS.CLOSE_LOGIN, '')
  }

  componentDidMount () {
    this.props.onGetLocalCredentials(this.showLoginMsg)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
    let newState = {
      username: nextProps.credentials.username,
      password: nextProps.credentials.password,
      submitting: false // nextProps.credentials.username && nextProps.credentials.password && nextProps.loginResult.success === null
    }

    this.setState(newState)
  }

  render () {
    const { submitting } = this.state
    const { username, password } = this.state
    const usernameSuffix = username ? <Icon type="close-circle" onClick={this.emitUsernameEmpty} /> : null
    const passwordSuffix = password ? <Icon type="close-circle" onClick={this.emitPasswordEmpty} /> : null
    const btnDisabled = !username || !password || username.length < 2 || password.length < 5
    const avatar = this.props.loginResult.profile ? this.props.loginResult.profile.avatar_url : require('../assets/images/icon.png')
    return (
        <div className={styles.wrapper}>
            <header>
              <div>{SHAREDCONSTANTS.APP}</div>
              <span id="closeLogin" className={styles.close} onClick={this.closeLoginWindow}><i></i><i></i></span>
            </header>
            <div className={styles.logoWrapper}>
              <img key="logo" className={classNames(styles.logo, 'logo', 'trans', {[styles.logoLogged]: this.props.loginResult.success === true})} src={avatar}/>
              {this.props.loginResult.success === true &&
              <div className={classNames(styles.name, 'name center fadeInDelay')}>
                <span>{this.props.loginResult.profile.name}</span>
              </div>}
            </div>
            {this.props.loginResult.success !== true &&
            <div className={styles.loginBox}>
              <div className="mt20">
                <Input
                  size="large"
                  placeholder="Github UserName"
                  prefix={<Icon type="user" />}
                  suffix={usernameSuffix}
                  value={username}
                  onChange={this.onChangeUserName}
                  disabled = {submitting}
                  ref={ (node) => { this.userNameInput = node } }
                />
              </div>
              <div className="mt10">
                <Input
                  size="large"
                  type="password"
                  placeholder="Access Token"
                  prefix={<Icon type="lock" />}
                  suffix={passwordSuffix}
                  value={password}
                  onChange={this.onChangePassword}
                  disabled = {submitting}
                  ref={ (node) => { this.passwordInput = node } }
                />
              </div>
              <div className="mt30">
                <Button
                  className={styles.loginBtn}
                  size="large"
                  type="primary"
                  loading={submitting}
                  onClick={this.enterSubmit}
                  disabled={btnDisabled}
                  ref={ (node) => { this.submitBtn = node } }
                >
                  {submitting ? '' : 'Login'}
                </Button>
              </div>
            </div>
            }
        </div>
    )
  }
}
