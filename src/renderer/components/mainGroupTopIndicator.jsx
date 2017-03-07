import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Icon, Tooltip }            from 'antd'

export default class MainGroupTopIndicator extends React.Component {
    refresh = () => {
        if (this.props.offline || !this.props.fetchStatus || this.props.fetchStatus.fetching) {
            return
        }
        this.props.onRefresh() // fetch real-time data from server and update repos list
    }

    render () {
        let Indicator
        if (this.props.offline) {
            Indicator = (<Tooltip placement="left" title={'Disabled as App is offline'}>
                    <Icon className={classNames('indicator', styles.indicator)} type="sync"
                    spin={this.props.fetchStatus && this.props.fetchStatus.fetching}
                    onClick={this.refresh}/>
                </Tooltip>)
        } else {
            Indicator = (<Icon className={classNames('indicator', styles.indicator)} type="sync"
                    spin={this.props.fetchStatus && this.props.fetchStatus.fetching}
                    onClick={this.refresh}/>)
        }
        return (
            <div className={classNames('indicatorWrap', styles.indicatorWrap)}>
                {Indicator}
            </div>
        )
    }
}
