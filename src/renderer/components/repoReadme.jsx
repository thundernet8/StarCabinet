import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Spin }                     from 'antd'
import ReactMarkdown                from 'react-markdown'
import 'github-markdown-css'

export default class RepoReadme extends React.Component {
    transformImageUri = (url) => {
        const regex = /http(s?):\/\//i
        if (!regex.test(url)) {
            const repo = this.props.selectedRepo
            let prefix = 'https://raw.githubusercontent.com/' + repo.fullName + '/' + repo.defaultBranch
            url.indexOf('.') !== 0 && (prefix += '/')

            return prefix + url
        }
        return url
    }

    // some readme markdown files includes html img tags
    // and also for relative src should be replaced
    replaceImageSrc = (content) => {
        const repo = this.props.selectedRepo
        let prefix = 'https://raw.githubusercontent.com/' + repo.fullName + '/' + repo.defaultBranch + '/'
        return content.replace(/(<img(.*?)src=")(?!http:\/\/)(.*?)"/g, '$1' + prefix + '$3"') // .replace(/!\[(.*?)\]\((?!http:\/\/)(.*?)\)/g, '![$1](' + prefix + '$2)')
    }

    componentWillMount () {
        if (this.props.selectedRepo/* && this.props.selectedRepo.readme === '' */) {
            this.props.onFetchRepoReadMe(this.props.selectedRepo)
        }
    }

    componentWillReceiveProps (nextProps) {
        if (!nextProps._hotChange && this.props.selectedRepo && nextProps.selectedRepo && nextProps.selectedRepo.readme === '' && nextProps.selectedRepo.id !== this.props.selectedRepo.id) {
            this.props.onFetchRepoReadMe(nextProps.selectedRepo)
        }
    }

    render () {
        if (!this.props.selectedRepo) {
            return null
        } else if (!this.props.selectedRepo.readme) {
            return (
                <div className={classNames('repoReadMeWrap', styles.repoReadMeWrap)}>
                    <div className={classNames(styles.repoReadmeLoading)}>
                        <Spin />
                    </div>
                </div>
            )
        }
        return (
            <div className={classNames('repoReadMeWrap', styles.repoReadMeWrap)}>
                 <div className={classNames('repoReadme markdown-body animated fadeInUp', styles.repoReadme)}>
                    <ReactMarkdown source={this.replaceImageSrc(this.props.selectedRepo.readme)} transformImageUri={this.transformImageUri} />
                </div>
            </div>
        )
    }
}
