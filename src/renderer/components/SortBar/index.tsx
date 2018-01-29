import * as React from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import ClassNames from "classnames";
import { Icon, Menu, Dropdown, Checkbox } from "antd";
import IStore from "../../interface/IStore";
import OrderBy from "../../enum/OrderBy";
import Order from "../../enum/Order";

const styles = require("./styles/index.less");

interface SortBarProps {
    store?: IStore;
}

interface SortBarState {}

@inject("store")
@observer
export default class SortBar extends React.Component<SortBarProps, SortBarState> {
    constructor(props) {
        super(props);
    }

    onMenuSelect = ({ key }) => {
        const mainStore = this.props.store!.main;
        const { fetching, order } = mainStore;
        const newOrder = Object.assign({}, toJS(order));

        if (fetching) {
            return;
        }

        if (key === Order.ORDER_ASC) {
            newOrder.desc = false;
        } else if (key === Order.ORDER_DESC) {
            newOrder.desc = true;
        } else {
            newOrder.by = key;
        }

        mainStore.onUpdateOrderCondition(newOrder.desc, newOrder.by);
    };

    render() {
        const mainStore = this.props.store!.main;
        const { repos, order } = mainStore;

        const orderBys = {
            [OrderBy.ORDER_BY_DEFAULT]: "DEFAULT",
            [OrderBy.ORDER_BY_STARS_COUNT]: "STARS",
            [OrderBy.ORDER_BY_FORKS_COUNT]: "FORKS",
            [OrderBy.ORDER_BY_WATCHERS_COUNT]: "WATCHERS",
            [OrderBy.ORDER_BY_CREATE_TIME]: "CREATE TIME",
            [OrderBy.ORDER_BY_UPDATE_TIME]: "UPDATE TIME",
            [OrderBy.ORDER_BY_PUSH_TIME]: "PUSH TIME",
            [OrderBy.ORDER_BY_SCORE]: "SCORE",
            [OrderBy.ORDER_BY_SIZE]: "SIZE",
            [OrderBy.ORDER_BY_OPEN_ISSUES_COUNT]: "OPEN ISSUES"
        };

        const upMenuItems = Object.keys(orderBys).map(key => {
            return (
                <Menu.Item key={key}>
                    <Checkbox checked={order.by === key}>
                        <a href="javascript:;">{orderBys[key]}</a>
                    </Checkbox>
                </Menu.Item>
            );
        });

        const menu = (
            <Menu
                className={ClassNames("sortDropdown", styles.sortDropdown)}
                onClick={this.onMenuSelect}
            >
                {upMenuItems}
                <Menu.Divider />
                <Menu.Item key={Order.ORDER_ASC}>
                    <Checkbox checked={!order.desc}>
                        <a href="javascript:;">ASC</a>
                    </Checkbox>
                </Menu.Item>
                <Menu.Item key={Order.ORDER_DESC}>
                    <Checkbox checked={order.desc}>
                        <a href="javascript:;">DESC</a>
                    </Checkbox>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={ClassNames("sortBarWrap", styles.sortBarWrap)}>
                <div className={ClassNames("reposCount", styles.reposCount)}>
                    {`${repos.length} Records`}
                </div>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <a className="ant-dropdown-link" href="javascript:;">
                        {`SORT BY ${orderBys[order.by]}`}
                        <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        );
    }
}
