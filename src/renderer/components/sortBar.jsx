import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Menu, Dropdown, Checkbox
}                                   from 'antd'
import * as CONSTANTS               from '../constants'

export default class SortBar extends React.Component {
    static propTypes = {
        desc: PropTypes.bool,
        by: PropTypes.string
    }

    state = {
        desc: true,
        by: CONSTANTS.ORDER_BY_DEFAULT
    }

    onMenuSelect = (({key}) => {
        if (this.props.fetchStatus && this.props.fetchStatus.fetching) {
            return
        }

        const order = {
            desc: this.state.desc,
            by: this.state.by
        }

        if (key === CONSTANTS.ORDER_ASC) {
            this.setState({
                desc: false
            })
            order.desc = false
        } else if (key === CONSTANTS.ORDER_DESC) {
            this.setState({
                desc: true
            })
            order.desc = true
        } else {
            this.setState({
                by: key
            })
            order.by = key
        }

        this.props.onUpdateOrderCondition(order)
    })

    render () {
        const bys = {
            [CONSTANTS.ORDER_BY_DEFAULT]: 'DEFAULT',
            [CONSTANTS.ORDER_BY_STARS_COUNT]: 'STARS',
            [CONSTANTS.ORDER_BY_FORKS_COUNT]: 'FORKS',
            [CONSTANTS.ORDER_BY_WATCHERS_COUNT]: 'WATCHERS',
            [CONSTANTS.ORDER_BY_CREATE_TIME]: 'CREATE TIME',
            [CONSTANTS.ORDER_BY_UPDATE_TIME]: 'UPDATE TIME',
            [CONSTANTS.ORDER_BY_PUSH_TIME]: 'PUSH TIME',
            [CONSTANTS.ORDER_BY_SCORE]: 'SCORE',
            [CONSTANTS.ORDER_BY_SIZE]: 'SIZE',
            [CONSTANTS.ORDER_BY_OPEN_ISSUES_COUNT]: 'OPEN ISSUES'
        }

        const upMenuItems = Object.keys(bys).map((key) => {
            return (
                <Menu.Item key={key}>
                    <Checkbox checked={this.state.by === key}>
                        <a href="javascript:;">{bys[key]}</a>
                    </Checkbox>
                </Menu.Item>
            )
        })

        const menu = (
            <Menu className={classNames('sortDropdown', styles.sortDropdown)} onClick={this.onMenuSelect}>
                {upMenuItems}
                <Menu.Divider />
                <Menu.Item key={CONSTANTS.ORDER_ASC}>
                    <Checkbox checked={!this.state.desc}>
                        <a href="javascript:;">ASC</a>
                    </Checkbox>
                </Menu.Item>
                <Menu.Item key={CONSTANTS.ORDER_DESC}>
                    <Checkbox checked={this.state.desc}>
                        <a href="javascript:;">DESC</a>
                    </Checkbox>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className={classNames('sortBarWrap', styles.sortBarWrap)}>
                <div className={classNames('reposCount', styles.reposCount)}>
                    {`${Object.keys(this.props.repos).length} Records`}
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="javascript:;">{`SORT BY ${bys[this.state.by]}`}<Icon type="down" /></a>
                </Dropdown>
            </div>
        )
    }
}
