import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import RepoItem                     from '../components/repoListItem'

// repos list wrapper
export default class ReposList extends React.Component {
    render () {
        const repoItems = Object.values(this.props.repos).map((repo) => <RepoItem key={repo.id} repo={repo} selectedRepo={this.props.selectedRepo} onSelectRepo={this.props.onSelectRepo} onRateRepo={this.props.onRateRepo} />)
        return (
            <div className={classNames('reposListWrapper', styles.reposListWrapper)}>
                {repoItems}
            </div>
        )
    }
}
