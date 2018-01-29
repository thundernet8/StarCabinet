import * as React from "react";
import ClassNames from "classnames";
import { Rate, Icon, Row, Col } from "antd";
import IRepo from "../../interface/IRepo";
import logger from "../../utils/logger";

const styles = require("./styles/item.less");

interface RepoListItemProps {
    repo: IRepo;
    selectedRepo: IRepo;
    onSelectRepo: (id: number) => void;
    onRateRepo: (id: number, score: number) => void;
}

interface RepoListItemState {}

export default class RepoListItem extends React.Component<RepoListItemProps, RepoListItemState> {
    constructor(props) {
        super(props);
    }

    clickStar = e => {
        e.stopPropagation();
    };

    onRateStar = value => {
        this.props.onRateRepo(this.props.repo.id, value);
    };

    shouldComponentUpdate(nextProps) {
        const nextSelectRepo = nextProps.selectedRepo || {};
        const currentSelectRepo = this.props.selectedRepo || {};
        if (
            (nextSelectRepo.id !== currentSelectRepo.id &&
                (nextSelectRepo.id === this.props.repo.id ||
                    currentSelectRepo.id === this.props.repo.id)) ||
            nextProps.repo.id !== this.props.repo.id ||
            nextProps.repo.score !== this.props.repo.score
        ) {
            return true;
        }
        return false;
    }

    render() {
        logger.log("Render repo item");
        const { repo, selectedRepo } = this.props;
        const klass = ClassNames("repoListItem", styles.repoListItem, {
            [styles.repoSelected]: selectedRepo && repo.id === selectedRepo.id
        });
        return (
            <div className={klass} onClick={this.props.onSelectRepo.bind(this, repo.id)}>
                <div className={styles.repoItemInner}>
                    <header>
                        <h2>{this.props.repo.name}</h2>
                        <span onClick={this.clickStar}>
                            <Rate
                                character={<Icon type="heart" />}
                                defaultValue={0}
                                value={repo.score}
                                onChange={this.onRateStar}
                            />
                        </span>
                    </header>
                    <div>
                        <p>{this.props.repo.description}</p>
                    </div>
                    <footer>
                        <Row gutter={0}>
                            <Col className="gutter-row" span={10}>
                                <div className="gutter-box">
                                    <Icon type="bulb" />
                                    {this.props.repo.lang}
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <div className="gutter-box">
                                    <Icon type="star-o" />
                                    {this.props.repo.stars.toString()}
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">
                                    <Icon type="usb" />
                                    {this.props.repo.forks.toString()}
                                </div>
                            </Col>
                        </Row>
                    </footer>
                </div>
            </div>
        );
    }
}
