import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Input, Radio, message } from "antd";
import IStore from "../../interface/IStore";
import SearchType from "../../enum/SearchType";

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const styles = require("./styles/index.less");

interface SearchBoxProps {
    store?: IStore;
}

interface SearchBoxState {
    focus: boolean;
    focusLock: boolean;
    searchField: SearchType;
    words: string;
    searching: boolean;
}

@inject("store")
@observer
export default class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            focusLock: false,
            searchField: SearchType.SEARCH_FIELD_ALL,
            words: "",
            searching: false
        };
    }

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
        const mainStore = this.props.store!.main;
        const { fetching } = mainStore;
        const { searching, words, searchField } = this.state;
        if (searching || words === value || fetching) {
            return;
        }
        this.setState({
            searching: true,
            words: value
        });

        mainStore
            .onUpdateSearchCondition(value, searchField)
            .then(repos => {
                if (value && repos) {
                    message.success(`Searched ${repos.length} results`);
                }
            })
            .finally(() => {
                this.setState({
                    searching: false
                });
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

    render() {
        return (
            <div
                className={ClassNames("searchBox", styles.searchBox, {
                    [styles.searchBoxFocused]: this.state.focus
                })}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <Search
                    className={ClassNames("searchInput", styles.searchInput)}
                    id="searchInput"
                    placeholder="Search"
                    onSearch={this.onSearch}
                />
                <div className={ClassNames("searchFields", styles.searchFields)}>
                    <RadioGroup
                        defaultValue={SearchType.SEARCH_FIELD_ALL}
                        size="default"
                        onChange={this.onRadioChange}
                    >
                        <RadioButton value={SearchType.SEARCH_FIELD_ALL}>All</RadioButton>
                        <RadioButton value={SearchType.SEARCH_FIELD_REPO_NAME}>Name</RadioButton>
                        <RadioButton value={SearchType.SEARCH_FIELD_REPO_DESCRIPTION}>
                            Intro
                        </RadioButton>
                        <RadioButton value={SearchType.SEARCH_FIELD_REPO_NOTE}>Note</RadioButton>
                        <RadioButton value={SearchType.SEARCH_FIELD_REPO_TAGS}>Tags</RadioButton>
                    </RadioGroup>
                </div>
            </div>
        );
    }
}
