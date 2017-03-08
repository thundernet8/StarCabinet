import React                                from 'react'
import classNames                           from 'classnames'
import styles                               from '../styles/main'
import { Icon, Modal, Input, Alert }        from 'antd'

export default class MainGroupFooter extends React.Component {
    state = {
        modalVisible: false,
        submitting: false,
        error: null
    }

    showAddCatDialog = () => {
        if (this.state.modalVisible) {
            return
        }
        this.setState({
            modalVisible: true
        })
    }

    closeAddCatDialog = () => {
        this.setState({
            modalVisible: false
        })
    }

    submitCatName = () => {
        const catName = this.catNameInput.value // TODO validate cat name
        if (!catName) {
            this.setState({
                error: 'Please input category name'
            })
            return
        }
        this.setState({
            submitting: true
        })
    }

    clearError = () => {
        this.setState({
            error: null
        })
    }

    render () {
        return (
            <div className={classNames('groupFooter', styles.groupFooter)}>
                <Icon className={classNames('settingBtn', styles.settingBtn)} type="setting"/>
                <Icon className={classNames('addCatBtn', styles.addCatBtn)} type="plus" onClick={this.showAddCatDialog}/>
                <Modal title = "Add a new category" wrapClassName = "vertical-center-modal" width = {275} visible = {this.state.modalVisible} closable = {false} okText = "OK"
                cancelText = "Cancel" confirmLoading = {this.state.submitting} maskClosable = {false} onOk = {this.submitCatName} onCancel = {this.closeAddCatDialog}>
                    {this.state.error && <Alert message={this.state.error} closable showIcon onClose={this.clearError} />}
                    <Input placeholder="category name" size="large" disabled={this.state.submitting} ref={ (node) => { this.catNameInput = node } } />
                </Modal>
            </div>
        )
    }
}
