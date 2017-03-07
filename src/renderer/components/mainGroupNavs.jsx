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

        let nextOpenKeys = []
        if (latestOpenKey) {
            nextOpenKeys = [].concat(latestOpenKey)
        }
        this.setState({ openKeys: nextOpenKeys })
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
        const languages = this.props.languages || []
        const langItems = languages.map((language) => <Menu.Item key={'lang_' + language.id}>{language.name}<span className={styles.navBadge}>{language.reposCount}</span></Menu.Item>)

        const categories = this.props.categories || []
        const catItems = categories.map((category) => <Menu.Item key={'cat_' + category.id}>{category.name}</Menu.Item>)
        return (
            <div className={classNames('groupNav', styles.groupNav)}>
                <Menu mode="inline" theme="dark" openKeys={this.state.openKeys} selectedKeys={[this.state.current]}
                    onOpenChange={this.onOpenChange} onClick={this.handleClick}>
                    <Menu.Item key={CONSTANTS.CATEGORY_TYPE_ALL}>
                        <Icon type="bars" /><span>ALL</span>
                    </Menu.Item>
                    <SubMenu key={CONSTANTS.CATEGORY_TYPE_LANGUAGE} title={<span><Icon type="book" /><span>LANGUAGE</span></span>}>
                        {langItems}
                    </SubMenu>
                    <SubMenu key={CONSTANTS.CATEGORY_TYPE_CUSTOM} title={<span><Icon type="folder" /><span>CATEGORIES</span></span>}>
                        {catItems}
                    </SubMenu>
                    <Menu.Item key={CONSTANTS.CATEGORY_TYPE_UNKNOWN}>
                        <Icon type="exception" /><span>UNCATEGORIZED</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
