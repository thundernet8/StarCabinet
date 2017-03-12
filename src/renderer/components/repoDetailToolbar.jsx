import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip, notification
}                                   from 'antd'

export default class RepoDetailToolbar extends React.Component {

    render () {
        return (
            <div className={classNames('detailToolbar', styles.detailToolbar)}>
                detail
            </div>
        )
    }
}
