import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import MainSearchBox                from '../containers/mainSearchBox'
import ReposList                    from '../containers/reposList'

// middle part of the main window
export default class MainListPane extends React.Component {
  render () {
    return (
      <div className={classNames('mid', styles.mid)}>
        <MainSearchBox/>
        <ReposList/>
      </div>
    )
  }
}
