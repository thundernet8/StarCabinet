import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'

// a single item of repos list
export default class RepoListItem extends React.Component {
  render () {
    return (
      <div className={classNames('repoListItem', styles.repoListItem)}>
        {this.props.repo.name}
      </div>
    )
  }
}
