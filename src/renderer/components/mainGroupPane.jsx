import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import RefreshIndicator             from '../containers/refreshIndicator'
import MainGroupAvatar              from '../containers/mainGroupAvatar'
import MainGroupNavs                from '../containers/mainGroupNavs'
import MainGroupFooter              from '../containers/mainGroupFooter'

// left part of the main window
export default class MainGroupPane extends React.Component {
    render () {
        return (
            <div className={classNames('left', styles.left)}>
                <header id="titleBar">
                    <RefreshIndicator/>
                </header>
                <MainGroupAvatar/>
                <MainGroupNavs/>
                <MainGroupFooter/>
            </div>
        )
    }
}
