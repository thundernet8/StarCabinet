import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main'
import {
    Icon, Tooltip, Popover, Button, Input, Checkbox
}                                   from 'antd'
import SCLogger                     from '../utils/logHelper'
const CheckboxGroup = Checkbox.Group

export default class RepoClassifyTool extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        categorySelection: PropTypes.array
    }

    state = {
        visible: false,
        categorySelection: []
    }

    submit = () => {
        this.setState({
            visible: false
        })
        this.props.onUpdateRepoCategories(this.props.repo.id, this.state.categorySelection.map(item => parseInt(item)))
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible })
    }

    onSelectionChange = (checkValues) => {
        SCLogger(checkValues)
        this.setState({
            categorySelection: checkValues
        })
    }

    queryCategories = (repoId) => {
        this.props.onGetCategoriesForRepo(repoId)
        .then((categories) => {
            this.setState({
                categorySelection: categories.map(category => category.id.toString())
            })
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.repo && (!this.props.repo || !nextProps.repo._categories)) {
            this.queryCategories(nextProps.repo.id)
        }
        if (nextProps.repo && nextProps.repo._categories) {
            this.setState({
                categorySelection: nextProps.repo._categories.map(category => category.id.toString())
            })
        }
    }

    componentWillMount () {
        const repo = this.props.repo
        if (repo && !repo._categories) {
            this.queryCategories(repo.id)
        }
    }

    render () {
        if (!this.props.repo) {
            return null
        }

        const titleNode = (
            <div className={classNames('notePaneTitle', styles.notePaneTitle)}>
                <span>Choose Repo Categoires</span>
                {this.props.categories && this.props.categories.length > 0 &&
                <a onClick={this.submit}>SAVE</a>}
            </div>
        )

        const catsSelectionOptions = this.props.categories.map((category) => {
            return { label: category.name, value: category.id.toString() }
        })

        const content = (
            <div className={classNames('repoNoteToolInputWrap', styles.repoNoteToolInputWrap)}>
                {(!this.props.categories || this.props.categories.length === 0)
                ? <div>Please add some categories before choosing ones</div>
                : <CheckboxGroup options={catsSelectionOptions} value={this.state.categorySelection} onChange={this.onSelectionChange} />}
            </div>
        )

        return (
            <Popover
                content={content}
                title={titleNode}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Tooltip placement="bottom" title="Classify it">
                    <Icon type="folder"/>
                </Tooltip>
            </Popover>
        )
    }
}
