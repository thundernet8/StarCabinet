import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Icon }                     from 'antd'

export default class MainGroupFooter extends React.Component {
    state = {}

    render () {
        return (
            <div className={classNames('groupFooter', styles.groupFooter)}>
                <Icon className={classNames('settingBtn', styles.settingBtn)} type="setting"/>
                <Icon className={classNames('addCatBtn', styles.addCatBtn)} type="plus"/>
            </div>
        )
    }
}
