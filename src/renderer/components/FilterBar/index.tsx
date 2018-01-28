import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Icon, Menu, Dropdown, Checkbox } from "antd";
import FilterType from "../../enum/FilterType";
import IStore from "../../interface/IStore";
import { IFilterConditionState } from "../../interface/IConditional";

const styles = require("./styles/index.less");

interface FilterBarProps {
    store?: IStore;
}

interface FilterBarState {}

@inject("store")
@observer
export default class FilterBar extends React.Component<FilterBarProps, FilterBarState> {
    constructor(props) {
        super(props);
    }

    get filters() {
        const mainStore = this.props.store!.main;
        const { filter } = mainStore;
        const filters: FilterType[] = [];
        if (filter.hasFlag) {
            filters.push(FilterType.FILTER_OPTION_HAS_FLAG);
        }
        if (filter.hasNote) {
            filters.push(FilterType.FILTER_OPTION_HAS_NOTE);
        }
        if (filter.unread) {
            filters.push(FilterType.FILTER_OPTION_UNREAD);
        }

        return filters;
    }

    onMenuSelect = ({ key }) => {
        const mainStore = this.props.store!.main;
        const { fetching } = mainStore;
        if (fetching) {
            return;
        }

        const index = this.filters.indexOf(key);
        let filters = this.filters;

        if (key === FilterType.FILTER_OPTION_NONE) {
            filters = [];
        } else {
            if (index > -1) {
                filters.splice(index, 1);
            } else {
                filters.push(key);
            }
        }

        const filterCondition: IFilterConditionState = {
            hasFlag: filters.includes(FilterType.FILTER_OPTION_HAS_FLAG),
            hasNote: filters.includes(FilterType.FILTER_OPTION_HAS_NOTE),
            unread: filters.includes(FilterType.FILTER_OPTION_UNREAD)
        };

        mainStore.onUpdateFilterCondition(filterCondition);
    };

    render() {
        const filterDict = {
            [FilterType.FILTER_OPTION_UNREAD]: "UNREAD",
            [FilterType.FILTER_OPTION_HAS_FLAG]: "HAS FLAG",
            [FilterType.FILTER_OPTION_HAS_NOTE]: "HAS NOTE"
        };

        const upMenuItems = Object.keys(filterDict).map(key => {
            return (
                <Menu.Item key={key}>
                    <Checkbox checked={this.filters.includes(key as FilterType)}>
                        <a href="javascript:;">{filterDict[key]}</a>
                    </Checkbox>
                </Menu.Item>
            );
        });

        const menu = (
            <Menu
                className={ClassNames("filterDropdown", styles.filterDropdown)}
                onClick={this.onMenuSelect}
            >
                {upMenuItems}
                <Menu.Divider />
                <Menu.Item key={FilterType.FILTER_OPTION_NONE}>
                    <Checkbox checked={false}>
                        <a href="javascript:;">NONE</a>
                    </Checkbox>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={ClassNames("filterBarWrap", styles.filterBarWrap)}>
                <Icon type="filter" />
                <Dropdown overlay={menu} trigger={["click"]} placement="topCenter">
                    <a className="ant-dropdown-link" href="javascript:;">
                        FILTERS<Icon type="down" />
                    </a>
                </Dropdown>
                <p>{this.filters.map(filter => filterDict[filter]).join(",")}</p>
            </div>
        );
    }
}
