import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip
}                                   from 'antd'
import ReactMarkdown                from 'react-markdown'
import 'github-markdown-css'

export default class RepoReadme extends React.Component {

    componentWillMount () {
        if (this.props.selectedRepo && this.props.selectedRepo.readme === '') {
            this.props.onFetchRepoReadMe(this.props.selectedRepo)
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.selectedRepo && nextProps.selectedRepo && nextProps.selectedRepo.readme === '' && nextProps.selectedRepo.id !== this.props.selectedRepo.id) {
            this.props.onFetchRepoReadMe(nextProps.selectedRepo)
        }
    }

    render () {
        if (!this.props.selectedRepo) {
            return null
        }
        return (
            <div className={classNames('repoReadMeWrap', styles.repoReadMeWrap)}>
                <div className={classNames('repoReadme markdown-body', styles.repoReadme)}>
                    <ReactMarkdown source={this.props.selectedRepo.readme} />
                </div>
            </div>
        )
    }
}
