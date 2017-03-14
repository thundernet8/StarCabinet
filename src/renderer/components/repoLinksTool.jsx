import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip, Popover, Button, message, Input
}                                   from 'antd'
import CopyToClipboard              from 'react-copy-to-clipboard'

export default class RepoLinksTool extends React.Component {

    state = {
        visible: false
    }

    hide = () => {
        this.setState({
            visible: false
        })
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible })
    }

    render () {
        if (!this.props.repo) {
            return null
        }
        const clipboard = (value) => (
            <CopyToClipboard text={value}
                onCopy={() => { message.success('Copied!') }}>
                <Icon type="copy" />
            </CopyToClipboard>
        )
        const content = (
            <div className={classNames('repoLinksToolInputWrap', styles.repoLinksToolInputWrap)}>
                <Input addonBefore="SSH" addonAfter={clipboard(this.props.repo.sshUrl)} value={this.props.repo.sshUrl} readOnly/>
                <Input addonBefore="HTTPS" addonAfter={clipboard(this.props.repo.cloneUrl)} value={this.props.repo.cloneUrl} readOnly/>
                <Input addonBefore="SVN" addonAfter={clipboard(this.props.repo.svnUrl)} value={this.props.repo.svnUrl} readOnly/>
            </div>
        )
        return (
            <Popover
                content={content}
                title="Clone Links"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Icon type="link" title="Repository links"/>
            </Popover>
        )
    }
}
