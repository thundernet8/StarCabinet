import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'

// right part of the main window
export default class MainDetailPane extends React.Component {
  componentDidMount () {}

  componentWillUnmount () {}

  render () {
    return (
      <div className={classNames('right', styles.right)}>
        <p>Detail</p>
        {this.props.children}
      </div>
    )
  }
}
