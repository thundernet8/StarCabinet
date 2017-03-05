import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'

// middle part of the main window
export default class MainListPane extends React.Component {
  render () {
    return (
      <div className={classNames('mid', styles.mid)}>
        <p>List</p>
      </div>
    )
  }
}
