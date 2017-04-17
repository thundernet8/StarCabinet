import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import { Rate, Icon, Row, Col }     from 'antd'
import SCLogger                     from '../utils/logHelper'

// a single item of repos list
export default class RepoListItem extends React.Component {
    state = {
        selected: false,
        score: this.props.repo.score
    }

    clickStar = (e) => {
        e.stopPropagation()
    }

    onRateStar = (value) => {
        this.setState({
            score: value
        })
        this.props.onRateRepo(this.props.repo.id, value)
    }

    selectRepo = (e) => {
        e.stopPropagation()

        if (!this.props.selectedRepo || this.props.repo.id !== this.props.selectedRepo.id) {
            this.props.onSelectRepo(this.props.repo)
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.selectedRepo) {
            this.setState({
                selected: this.props.repo.id === nextProps.selectedRepo.id
            })
        }
        // if (nextProps.repo) {
        //     this.setState({
        //         score: nextProps.repo.score
        //     })
        // }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (nextState.selected !== this.state.selected || nextState.score !== this.state.score) {
            return true
        }
        return false
    }

    render () {
        SCLogger('render repo item')
        const klass = classNames('repoListItem animated fadeIn', styles.repoListItem, {[styles.repoSelected]: this.state.selected})
        return (
            <div className={klass} onClick={this.selectRepo}>
                <div className={styles.repoItemInner}>
                    <header>
                        <h2>{this.props.repo.name}</h2>
                        <span onClick={this.clickStar}><Rate character={<Icon type="heart" />} defaultValue={0} value={this.state.score} onChange={this.onRateStar} /></span>
                    </header>
                    <div><p>{this.props.repo.description}</p></div>
                    <footer>
                        <Row gutter={0}>
                            <Col className="gutter-row" span={10}>
                                <div className="gutter-box"><Icon type="bulb"/>{this.props.repo.lang}</div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <div className="gutter-box"><Icon type="star-o"/>{this.props.repo.stars.toString()}</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box"><Icon type="usb"/>{this.props.repo.forks.toString()}</div>
                            </Col>
                        </Row>
                    </footer>
                </div>
            </div>
        )
    }
}
