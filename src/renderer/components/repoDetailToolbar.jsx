import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip, notification, message
}                                   from 'antd'

export default class RepoDetailToolbar extends React.Component {

    viewInGithub = () => {
        console.log(this.props.selectedRepo)
        if (this.props.selectedRepo) {
            const url = this.props.selectedRepo.htmlUrl
            window.open(url, '_blank')
        }
    }

    starStarCabinet = () => {
        this.props.onStarStarCabinet()
        .then(() => {
            message.success('Thank you for starring me')
        })
        .catch(() => {
            message.info('Failed but thank you, maybe you have starred already')
            window.open('https://github.com/thundernet8/StarCabinet', '_blank')
        })
    }

    render () {
        let readIcon, flagIcon
        if (this.props.selectedRepo) {
            readIcon = <Icon type={this.props.selectedRepo.read ? 'eye' : 'eye-o'} title={this.props.selectedRepo.read ? 'Mark as unread' : 'Mark as read'} data-read={this.props.selectedRepo.read}/>
            flagIcon = <Icon type="flag" title={this.props.selectedRepo.flag ? 'Remove flag' : 'Add flag'} data-flag={this.props.selectedRepo.flag}/>
        } else {
            readIcon = <Icon type="eye-o"/>
            flagIcon = <Icon type="flag"/>
        }
        return (
            <div className={classNames('detailToolbar', styles.detailToolbar, {[styles.disabled]: !this.props.selectedRepo})}>
                <Icon type="select" title="View in Github" onClick={this.viewInGithub}/>
                {readIcon}
                {flagIcon}
                <Icon type="folder" title="Classify it"/>
                <Icon type="edit" title="Add your notes"/>
                <Icon type="link" title="Repository links"/>
                <Icon type="github" title="Star StarCabinet" onClick={this.starStarCabinet}/>
            </div>
        )
    }
}
