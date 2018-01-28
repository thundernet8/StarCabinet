import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Icon, Tooltip, notification } from "antd";
import IStore from "../../interface/IStore";

const styles = require("./styles/index.less");

interface RefreshIndicatorProps {
    store?: IStore;
}

interface RefreshIndicatorState {}

@inject("store")
@observer
export default class RefreshIndicator extends React.Component<
    RefreshIndicatorProps,
    RefreshIndicatorState
> {
    constructor(props) {
        super(props);
    }

    refresh = () => {
        const mainStore = this.props.store!.main;
        mainStore
            .fetchRemoteRepos()
            .then(increase => {
                this.showIncreaseMessage(increase);
            })
            .catch(() => {});
    };

    componentDidMount() {
        const mainStore = this.props.store!.main;
        mainStore
            .startup()
            .then(increase => {
                this.showIncreaseMessage(increase);
            })
            .catch(() => {});
    }

    showIncreaseMessage = (increase: number) => {
        notification.success({
            message: "Starred Repos Fetched",
            description:
                increase < 0
                    ? `Decreased ${Math.abs(increase)} starred repositories.`
                    : `${increase} starred repositories were added.`,
            duration: 10
        });
    };

    render() {
        const globalStore = this.props.store!.global;
        const mainStore = this.props.store!.main;
        const { offline } = globalStore;
        const { fetching } = mainStore;

        let indicator;
        if (offline) {
            indicator = (
                <Tooltip placement="left" title={"Disabled as App is offline"}>
                    <Icon
                        className={ClassNames("indicator", styles.indicator)}
                        type="sync"
                        spin={fetching}
                        onClick={this.refresh}
                    />
                </Tooltip>
            );
        } else {
            indicator = (
                <Icon
                    className={ClassNames("indicator", styles.indicator)}
                    type="sync"
                    spin={fetching}
                    onClick={this.refresh}
                />
            );
        }
        return <div className={ClassNames("indicatorWrap", styles.indicatorWrap)}>{indicator}</div>;
    }
}
