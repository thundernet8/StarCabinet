import * as React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import ClassNames from "classnames";
import { Menu, Icon } from "antd";
import IStore from "../../interface/IStore";
import GroupType from "../../enum/GroupType";

const SubMenu = Menu.SubMenu;

const styles = require("./styles/index.less");

interface MainGroupNavsProps {
    store?: IStore;
}

interface MainGroupNavsState {}

@inject("store")
@observer
export default class MainGroupNavs extends React.Component<MainGroupNavsProps, MainGroupNavsState> {
    constructor(props) {
        super(props);
    }

    deleteCategory = (id: number, e) => {
        e.stopPropagation();
        // TODO
        console.log(id);
    };

    render() {
        const mainStore = this.props.store!.main;
        const { languages, categories, openNavMenus } = mainStore;
        const currentItem = mainStore.group.id;

        return (
            <div className={ClassNames("groupNav", styles.groupNav)}>
                <Menu
                    mode="inline"
                    theme="dark"
                    openKeys={toJS(openNavMenus)}
                    selectedKeys={[currentItem]}
                    onOpenChange={mainStore.onToggleNavMenus}
                    onClick={mainStore.onClickNavMenuItem}
                >
                    <Menu.Item key={GroupType.GROUP_TYPE_ALL}>
                        <Icon type="inbox" />
                        <span>ALL</span>
                    </Menu.Item>
                    <SubMenu
                        key={GroupType.GROUP_TYPE_LANGUAGE}
                        title={
                            <span>
                                <Icon type="book" />
                                <span>LANGUAGES</span>
                            </span>
                        }
                    >
                        {languages.map(language => (
                            <Menu.Item key={language.name} className={styles.langItem}>
                                {language.name}
                                <span className={styles.navBadge}>{language.reposCount}</span>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                    <SubMenu
                        key={GroupType.GROUP_TYPE_CATEGORY}
                        title={
                            <span>
                                <Icon type="folder" />
                                <span>CATEGORIES</span>
                            </span>
                        }
                    >
                        {categories.map(category => (
                            <Menu.Item key={category.id} className={styles.catItem}>
                                <Icon
                                    type="close-circle-o"
                                    className={styles.navDel}
                                    onClick={this.deleteCategory.bind(this, category.id)}
                                />
                                {category.name}
                                <span className={styles.navBadge}>{category.reposCount}</span>
                            </Menu.Item>
                        ))}
                    </SubMenu>
                    <Menu.Item key={GroupType.GROUP_TYPE_UNKNOWN}>
                        <Icon type="exception" />
                        <span>UNCATEGORIZED</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
