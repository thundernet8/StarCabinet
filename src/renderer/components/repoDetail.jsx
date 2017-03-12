import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip, notification, message,
    Tag, Input, Button
}                                   from 'antd'
import RepoTagsBar                  from '../containers/repoTagsBar'

export default class RepoDetail extends React.Component {

    render () {
        if (!this.props.selectedRepo) {
            return null
        }
        const fullName = this.props.selectedRepo.fullName
        const namePieces = fullName.split('/')
        return (
            <div className={classNames('repoDetailInner', styles.repoDetailInner)}>
                <header>
                    <div className={styles.headtitle}>
                        <Icon type="home"/>
                        <a href={this.props.selectedRepo.htmlUrl.replace(fullName, namePieces[0])} target="_blank">{namePieces[0]}</a>
                        <span>/</span>
                        <a href={this.props.selectedRepo.htmlUrl} target="_blank">{namePieces[1]}</a>
                    </div>
                    <div className={styles.repoMeta}>
                        Latest Push: {this.props.selectedRepo.pushedAt.replace('T', ' ').replace('Z', '')}
                    </div>
                    <RepoTagsBar/>
                </header>
            </div>
        )
    }
}
