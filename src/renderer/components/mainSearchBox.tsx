import React from "react";
import classNames from "classnames";
import * as CONSTANTS from "../constants";
import { Input, Radio, message } from "antd";
import { MainSearchBoxProps } from "../containers/mainSearchBox";

const styles = require("../styles/main.less");

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class MainSearchBox extends React.Component<MainSearchBoxProps> {
    state = {
        focus: false,
        focusLock: false,
        searchField: CONSTANTS.SEARCH_FIELD_ALL,
        words: "",
        searching: false
    };

    onFocus = () => {
        this.setState({
            focus: true
        });
    };

    onBlur = () => {
        if (this.state.focusLock) {
            return;
        }
        this.setState({
            focus: false
        });
    };

    onSearch = value => {
        if (
            this.state.searching ||
            this.state.words === value ||
            (this.props.fetchStatus && this.props.fetchStatus.fetching)
        ) {
            return;
        }
        const search = {
            key: value,
            field: this.state.searchField
        };
        this.props.onUpdateSearchCondition(search);
        this.setState({
            searching: true,
            words: value
        });
    };

    onMouseEnter = () => {
        this.setState({
            focusLock: true
        });
    };

    onMouseLeave = () => {
        this.setState({
            focusLock: false
        });
    };

    onRadioChange = e => {
        const field = e.target.value;
        this.setState({
            searchField: field
        });
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.searching && nextProps.search.key === this.props.search.key) {
            message.success(`Searched ${Object.keys(nextProps.repos).length} results`);
            this.setState({
                searching: false
            });
        }
    }

    render() {
        return (
            <div
                className={classNames("searchBox", styles.searchBox, {
                    [styles.searchBoxFocused]: this.state.focus
                })}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <Search
                    className={classNames("searchInput", styles.searchInput)}
                    id="searchInput"
                    placeholder="Search"
                    onSearch={this.onSearch}
                />
                <div className={classNames("searchFields", styles.searchFields)}>
                    <RadioGroup
                        defaultValue={CONSTANTS.SEARCH_FIELD_ALL}
                        size="medium"
                        onChange={this.onRadioChange}
                    >
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_ALL}>All</RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_NAME}>Name</RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_DESCRIPTION}>
                            Intro
                        </RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_NOTE}>Note</RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_TAGS}>Tags</RadioButton>
                    </RadioGroup>
                </div>
            </div>
        );
    }
}
