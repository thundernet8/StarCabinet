import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'

// middle part of the main window
export default class MainListPane extends React.Component {
  componentDidMount () {}

  componentWillUnmount () {}

  render () {
    return (
      <div className={classNames('mid', styles.mid)}>
        <p>List</p>
        {this.props.children}
      </div>
    )
  }
}
