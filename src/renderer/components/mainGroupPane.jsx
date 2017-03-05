import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import MainGroupTopIndicator        from '../containers/mainGroupTopIndicator'
import MainGroupAvatar              from '../containers/mainGroupAvatar'
import MainGroupNavs                from '../containers/mainGroupNavs'

// left part of the main window
export default class MainGroupPane extends React.Component {
    componentDidMount () {}

    componentWillUnmount () {}

    render () {
        return (
            <div className={classNames('left', styles.left)}>
                <header id="titleBar"/>
                <MainGroupTopIndicator/>
                <MainGroupAvatar/>
                <MainGroupNavs/>
            </div>
        )
    }
}
