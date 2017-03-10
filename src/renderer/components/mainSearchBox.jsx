import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import * as CONSTANTS               from '../constants'
import { Input, Radio }             from 'antd'
const Search = Input.Search
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class MainSearchBox extends React.Component {
    static propTypes = {
        focus: PropTypes.bool,
        focusLock: PropTypes.bool,
        searchField: PropTypes.string
    }

    state = {
        focus: false,
        focusLock: false,
        searchField: CONSTANTS.SEARCH_FIELD_ALL
    }

    onFocus = () => {
        this.setState({
            focus: true
        })
    }

    onBlur = () => {
        if (this.state.focusLock) {
            return
        }
        this.setState({
            focus: false
        })
    }

    onSearch = (value) => {
        this.setState({
            focus: false
        })
        const search = {
            key: value,
            field: this.state.searchField
        }
        this.props.onUpdateSearchCondition(search)
    }

    onMouseEnter = () => {
        this.setState({
            focusLock: true
        })
    }

    onMouseLeave = () => {
        this.setState({
            focusLock: false
        })
    }

    onRadioChange = (e) => {
        const field = e.target.value
        this.setState({
            searchField: field
        })
    }

    render () {
        return (
            <div className={classNames('searchBox', styles.searchBox, {[styles.searchBoxFocused]: this.state.focus})}
            onFocus={this.onFocus} onBlur={this.onBlur} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <Search className={classNames('searchInput', styles.searchInput)} id="searchInput" placeholder="Search"
    onSearch={this.onSearch}/>
                <div className={classNames('searchFields', styles.searchFields)}>
                    <RadioGroup defaultValue={CONSTANTS.SEARCH_FIELD_ALL} size="medium" onChange={this.onRadioChange}>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_ALL}>All</RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_NAME}>Name</RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_DESCRIPTION}>Intro</RadioButton>
                        <RadioButton value={CONSTANTS.SEARCH_FIELD_REPO_REMARK}>Remark</RadioButton>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}
