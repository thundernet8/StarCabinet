import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Icon }                     from 'antd'

export default class MainGroupTopIndicator extends React.Component {
    refresh = () => {
        if (!this.props.fetchStatus || this.props.fetchStatus.fetching) {
            return
        }
        this.props.onRefresh() // fetch real-time data from server and update repos list
    }

    render () {
        return (
            <div className={classNames('indicatorWrap', styles.indicatorWrap)}>
                <Icon className={classNames('indicator', styles.indicator)} type="reload"
                spin={this.props.fetchStatus && this.props.fetchStatus.fetching}
                onClick={this.refresh}/>
            </div>
        )
    }
}
