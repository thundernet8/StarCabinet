import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'

// left part of the main window
export default class MainGroupPane extends React.Component {
  componentDidMount () {}

  componentWillUnmount () {}

  render () {
    return (
      <div className={classNames('left', styles.left)}>
        <p>Group</p>
        {this.props.children}
      </div>
    )
  }
}
