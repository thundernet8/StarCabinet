import React                        from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import { Rate, Icon, Row, Col }     from 'antd'

// a single item of repos list
export default class RepoListItem extends React.Component {

    clickStar = (e) => {
        e.stopPropagation()
    }

    onRateStar = (value) => {
        console.log(value) // TODO write into db
    }

    selectRepo = (e) => {
        e.stopPropagation()

        if (this.props.repo.id !== this.props.selectedRepoId) {
            this.props.onSelectRepo(this.props.repo.id)
        }
    }

    render () {
        return (
            <div className={classNames('repoListItem', styles.repoListItem, {[styles.repoSelected]: this.props.repo.id === this.props.selectedRepoId})} onClick={this.selectRepo}>
                <header>
                    <h2>{this.props.repo.name}</h2>
                    <span onClick={this.clickStar}><Rate character={<Icon type="heart" />} defaultValue={0} onChange={this.onRateStar} /></span>
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
        )
    }
}
