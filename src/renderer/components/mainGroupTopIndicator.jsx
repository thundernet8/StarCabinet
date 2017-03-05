import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Icon }                     from 'antd'

export default class MainGroupTopIndicator extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <div className={classNames('indicatorWrap', styles.indicatorWrap)}>
                <Icon className={classNames('indicator', styles.indicator)} type="reload"/>
            </div>
        )
    }
}
