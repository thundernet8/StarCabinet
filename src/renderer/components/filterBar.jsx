import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Menu, Dropdown, Checkbox
}                                   from 'antd'
import * as CONSTANTS               from '../constants'

export default class FilterBar extends React.Component {
    static propTypes = {
        filters: PropTypes.array
    }

    state = {
        filters: []
    }

    onMenuSelect = (({key}) => {
        if (this.props.fetchStatus && this.props.fetchStatus.fetching) {
            return
        }

        const index = this.state.filters.indexOf(key)
        let filters = this.state.filters

        if (key === CONSTANTS.FILTER_OPTION_NONE) {
            filters = []
        } else {
            if (index > -1) {
                filters.splice(index, 1)
            } else {
                filters.push(key)
            }
        }
        this.setState({
            filters
        })

        const filterCondition = {
            hasFlag: filters.indexOf(CONSTANTS.FILTER_OPTION_HAS_FLAG) > -1,
            hasRemark: filters.indexOf(CONSTANTS.FILTER_OPTION_HAS_REMAKR) > -1,
            unread: filters.indexOf(CONSTANTS.FILTER_OPTION_UNREAD) > -1
        }

        this.props.onUpdateFilterCondition(filterCondition)
    })

    render () {
        const filterDict = {
            [CONSTANTS.FILTER_OPTION_UNREAD]: 'UNREAD',
            [CONSTANTS.FILTER_OPTION_HAS_FLAG]: 'HAS FLAG',
            [CONSTANTS.FILTER_OPTION_HAS_REMAKR]: 'HAS REMARK'
        }

        const upMenuItems = Object.keys(filterDict).map((key) => {
            return (
                <Menu.Item key={key}>
                    <Checkbox checked={this.state.filters.indexOf(key) > -1}>
                        <a href="javascript:;">{filterDict[key]}</a>
                    </Checkbox>
                </Menu.Item>
            )
        })

        const menu = (
            <Menu className={classNames('filterDropdown', styles.filterDropdown)} onClick={this.onMenuSelect}>
                {upMenuItems}
                <Menu.Divider />
                <Menu.Item key={CONSTANTS.FILTER_OPTION_NONE}>
                    <Checkbox checked={false}>
                        <a href="javascript:;">NONE</a>
                    </Checkbox>
                </Menu.Item>
            </Menu>
        )

        return (
            <div className={classNames('filterBarWrap', styles.filterBarWrap)}>
                <Icon type="filter"/>
                <Dropdown overlay={menu} trigger={['click']} placement='topCenter'>
                    <a className="ant-dropdown-link" href="javascript:;">
                        FILTERS<Icon type="down" />
                    </a>
                </Dropdown>
                <p>{this.state.filters.map(filter => filterDict[filter]).join(',')}</p>
            </div>
        )
    }
}
