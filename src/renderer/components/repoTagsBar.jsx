import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip, notification, message,
    Tag, Input, Button
}                                   from 'antd'

export default class RepoTagsBar extends React.Component {

    static propTypes = {
        tags: PropTypes.array,
        inputVisible: PropTypes.bool,
        inputValue: PropTypes.string
    }

    state = {
        tags: [],
        inputVisible: false,
        inputValue: ''
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag)
        this.setState({ tags })

        // remove tag in db
        this.props.onRemoveTagForRepo(this.props.selectedRepo.id, removedTag)
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus())
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value.trim() })
    }

    handleInputConfirm = () => {
        const state = this.state
        const inputValue = state.inputValue
        let tags = state.tags
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue]
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        })

        // save new tag in db
        this.props.onAddTagForRepo(this.props.selectedRepo.id, inputValue)
    }

    saveInputRef = (input) => { this.input = input }

    queryTags = (tagIds) => {
        this.props.onGetTagsForRepo(tagIds)
        .then((tags) => {
            this.setState({
                tags
            })
        })
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
        if (nextProps.selectedRepo && (!this.props.selectedRepo || this.props.selectedRepo.id !== nextProps.selectedRepo.id)) {
            this.queryTags(nextProps.selectedRepo.SCTags)
        }
    }

    componentWillMount () {
        if (this.props.selectedRepo) {
            this.queryTags(this.props.selectedRepo.SCTags)
        }
    }

    render () {
        const { tags, inputVisible, inputValue } = this.state
        return (
            <div className={styles.repoTags}>
                <Icon type="tags"/>
                {tags.map((tag, index) => {
                const isLongTag = tag.length > 20
                const tagElem = (
                    <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                )
                return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem
                })}
                {inputVisible && (
                <Input
                    ref={this.saveInputRef}
                    type="text" size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
                )}
                {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
            </div>
        )
    }
}
