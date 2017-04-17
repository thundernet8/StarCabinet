import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import { Menu, Icon }               from 'antd'
import * as CONSTANTS               from '../constants'
import indexOf                      from 'lodash/indexOf'
const SubMenu = Menu.SubMenu
const noSubsCatKeys = [CONSTANTS.GROUP_TYPE_ALL, CONSTANTS.GROUP_TYPE_UNKNOWN]
const hasSubsCatKeys = [CONSTANTS.GROUP_TYPE_LANGUAGE, CONSTANTS.GROUP_TYPE_CATEGORY]

export default class MainGroupNavs extends React.Component {
    state = {
        current: CONSTANTS.GROUP_TYPE_ALL,
        openKeys: [CONSTANTS.GROUP_TYPE_ALL]
    }

    handleClick = (e) => {
        if (this.state.stopBubble || !this.props.fetchStatus || this.props.fetchStatus.fetching) {
            return // not available when fetching data
        }
        let group
        const key = e.key
        const keyPath = e.keyPath
        if (keyPath.length === 1) {
            group = {
                id: key,
                type: key
            }
        } else {
            group = {
                id: key,
                type: keyPath[1]
            }
        }
        if (group.id === this.state.current) {
            return
        }
        this.props.onUpdateGroupCondition(group)
        this.setState({ current: key })
    }

    onOpenChange = (openKeys) => {
        const state = this.state
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))

        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = [].concat(latestOpenKey)
        }
        this.setState({ openKeys: nextOpenKeys })
    }

    deleteCategory = (id, e) => {
        e.stopPropagation()
        this.props.onDeleteCategory(id)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.group) {
            this.setState({
                current: nextProps.group.id.toString(),
                openKeys: [nextProps.group.type]
            })
        }
    }

    render () {
        const languages = this.props.languages || []
        const langItems = languages.map((language) => <Menu.Item key={language.name} className={styles.langItem}>{language.name}<span className={styles.navBadge}>{language.reposCount}</span></Menu.Item>)

        const categories = this.props.categories || []
        const catItems = categories.map((category) => <Menu.Item key={category.id} className={styles.catItem}><Icon type="close-circle-o" className={styles.navDel} onClick={this.deleteCategory.bind(this, category.id)} />{category.name}<span className={styles.navBadge}>{category.reposCount}</span></Menu.Item>)
        return (
            <div className={classNames('groupNav', styles.groupNav)}>
                <Menu mode="inline" theme="dark" openKeys={this.state.openKeys} selectedKeys={[this.state.current]}
                    onOpenChange={this.onOpenChange} onClick={this.handleClick}>
                    <Menu.Item key={CONSTANTS.GROUP_TYPE_ALL}>
                        <Icon type="inbox" /><span>ALL</span>
                    </Menu.Item>
                    <SubMenu key={CONSTANTS.GROUP_TYPE_LANGUAGE} title={<span><Icon type="book" /><span>LANGUAGES</span></span>}>
                        {langItems}
                    </SubMenu>
                    <SubMenu key={CONSTANTS.GROUP_TYPE_CATEGORY} title={<span><Icon type="folder" /><span>CATEGORIES</span></span>}>
                        {catItems}
                    </SubMenu>
                    <Menu.Item key={CONSTANTS.GROUP_TYPE_UNKNOWN}>
                        <Icon type="exception" /><span>UNCATEGORIZED</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
