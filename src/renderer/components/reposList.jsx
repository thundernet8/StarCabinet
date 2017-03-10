import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import RepoItem                     from '../containers/repoListItem'

// repos list wrapper
export default class ReposList extends React.Component {
    componentWillReceiveProps (nextProps) {
        // TODO
    }

    render () {
        const repoItems = this.props.repos.map((repo) => <RepoItem key={repo.id} repo={repo} selectedRepoId={this.props.selectedRepoId} />)
        return (
            <div className={classNames('reposListWrapper', styles.reposListWrapper)}>
                {repoItems}
            </div>
        )
    }
}
