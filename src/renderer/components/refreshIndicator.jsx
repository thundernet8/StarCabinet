import React from "react";
import classNames from "classnames";
import styles from "../styles/main";
import { Icon, Tooltip, notification } from "antd";

export default class RefreshIndicator extends React.Component {
    refresh = () => {
        if (
            this.props.offline ||
            !this.props.fetchStatus ||
            this.props.fetchStatus.fetching
        ) {
            return;
        }
        this.props.onRefresh(); // fetch real-time data from server and update repos list
    };

    openFetchResultsNotification = increase => {
        notification.success({
            message: "Starred Repos Fetched",
            description:
                increase < 0
                    ? `Decreased ${Math.abs(increase)} starred repositories.`
                    : `${increase} starred repositories were added.`,
            duration: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.increase) {
            this.openFetchResultsNotification(nextProps.increase);
            this.props.onClearIncreaseProp();
        }
    }

    render() {
        let indicator;
        if (this.props.offline) {
            indicator = (
                <Tooltip placement="left" title={"Disabled as App is offline"}>
                    <Icon
                        className={classNames("indicator", styles.indicator)}
                        type="sync"
                        spin={
                            this.props.fetchStatus &&
                            this.props.fetchStatus.fetching
                        }
                        onClick={this.refresh}
                    />
                </Tooltip>
            );
        } else {
            indicator = (
                <Icon
                    className={classNames("indicator", styles.indicator)}
                    type="sync"
                    spin={
                        this.props.fetchStatus &&
                        this.props.fetchStatus.fetching
                    }
                    onClick={this.refresh}
                />
            );
        }
        return (
            <div className={classNames("indicatorWrap", styles.indicatorWrap)}>
                {indicator}
            </div>
        );
    }
}
