import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Menu, Icon }               from 'antd'
import * as CONSTANTS               from '../constants'
import indexOf                      from 'lodash/indexOf'
const SubMenu = Menu.SubMenu
const noSubsCatKeys = [CONSTANTS.CATEGORY_TYPE_ALL, CONSTANTS.CATEGORY_TYPE_UNKNOWN]
const hasSubsCatKeys = [CONSTANTS.CATEGORY_TYPE_LANGUAGE, CONSTANTS.CATEGORY_TYPE_CUSTOM]

export default class MainGroupNavs extends React.Component {
    state = {
        current: CONSTANTS.CATEGORY_TYPE_ALL,
        openKeys: [CONSTANTS.CATEGORY_TYPE_ALL]
    }

    handleClick = (e) => {
        console.log('Clicked: ', e)
        this.setState({ current: e.key })
    }

    onOpenChange = (openKeys) => {
        const state = this.state
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey)
        }
        this.setState({ openKeys: nextOpenKeys })
    }

    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2']
        }
        return map[key] || []
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.category) {
            this.setState({
                current: nextProps.category.id.toString(),
                openKeys: [nextProps.category.type]
            })
        }
    }

    render () {
        return (
            <div className={classNames('groupNav', styles.groupNav)}>
                <Menu mode="inline" theme="dark" openKeys={this.state.openKeys} selectedKeys={[this.state.current]}
                    onOpenChange={this.onOpenChange} onClick={this.handleClick}>
                    <Menu.Item key={CONSTANTS.CATEGORY_TYPE_ALL}>
                        <Icon type="bars" /><span>ALL</span>
                    </Menu.Item>
                    <SubMenu key={CONSTANTS.CATEGORY_TYPE_LANGUAGE} title={<span><Icon type="book" /><span>LANGUAGE</span></span>}>
                        <Menu.Item key="1">PHP</Menu.Item>
                        <Menu.Item key="2">JavaScript</Menu.Item>
                    </SubMenu>
                    <SubMenu key={CONSTANTS.CATEGORY_TYPE_CUSTOM} title={<span><Icon type="folder" /><span>CATEGORIES</span></span>}>
                        <Menu.Item key="3">CATEGORY 1</Menu.Item>
                        <Menu.Item key="4">CATEGORY 2</Menu.Item>
                        <Menu.Item key="0">CATEGORY 3</Menu.Item>
                        <Menu.Item key="6">CATEGORY 4</Menu.Item>
                    </SubMenu>
                    <Menu.Item key={CONSTANTS.CATEGORY_TYPE_UNKNOWN}>
                        <Icon type="exception" /><span>UNCATEGORIZED</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
