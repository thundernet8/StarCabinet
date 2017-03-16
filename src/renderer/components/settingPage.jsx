import React, { PropTypes }                         from 'react'
import { Link }                                     from 'react-router'
import styles                                       from '../styles/setting.scss'
import * as EVENTS                                  from '../../shared/events'
import * as SHAREDCONSTANTS                         from '../../shared/constants'
import { ipcRenderer }                              from 'electron'
import { Upload, Icon, Button, message }            from 'antd'
import classNames                                   from 'classnames'
import dbName                                       from '../utils/dbName'
const defaultAvatar = require('../assets/images/avatar-default.png')

export default class SettingPage extends React.Component {
    static propTypes = {
        importing: PropTypes.bool,
        exporting: PropTypes.bool
    }

    state = {
        importing: false,
        exporting: false
    }

    getAvatarUrl = () => {
        if (!this.props.profile || !this.props.profile.avatarUrl) {
            return defaultAvatar
        }
        return this.props.profile.avatarUrl
    }

    signout = () => {

    }

    importData = () => {

    }

    exportData = () => {

    }

    openFeedback = () => {
        window.open('https://github.com/thundernet8/StarCabinet/issues', '_blank')
    }

    componentWillMount () {
        this.props.onGetLocalCredentials()
        .then((credentials) => {
            return this.props.onGetRxDB(dbName(credentials.username))
        })
        .then(() => {
            this.props.onGetMyProfile()
        })
    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        return (
            <div className={classNames('settingWrapper', styles.settingWrapper)}>
                <header>
                    <div>SETTING</div>
                </header>
                <section className={classNames('settingBody', styles.settingBody)}>
                    <div className={classNames('settingRow', styles.settingRow, styles.accountSetting)}>
                        <img className={styles.accountAvatar} src={this.getAvatarUrl()}/>
                        {this.props.profile &&
                        <span className={styles.accountName}>{this.props.profile.name}</span>
                        }
                        <Button type="default" size="default" onClick={this.signout}>SignOut</Button>
                    </div>
                    <div className={classNames('settingRow', styles.settingRow, styles.contact)}>
                        <span>Backup: </span>
                        <Button>
                                <Icon type="upload" /> Click to Export
                            </Button>
                    </div>
                    <div className={classNames('settingRow', styles.settingRow, styles.contact)}>
                        <span>Restore: </span>
                        <Button>
                            <Icon type="download" /> Click to Import
                        </Button>
                    </div>
                    <div className={classNames('settingRow', styles.settingRow, styles.contact)}>
                        <span>Feedback: </span>
                        <Button type="default" size="default" onClick={this.openFeedback}>Submit Feedback</Button>
                    </div>
                </section>
                <footer>&copy; 2017-{`${(new Date().getFullYear())} StarCabinet`}</footer>
            </div>
        )
    }
}
