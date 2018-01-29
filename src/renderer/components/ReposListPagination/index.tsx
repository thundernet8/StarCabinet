import * as React from "react";
import { observer, inject } from "mobx-react";
import { Pagination } from "antd";
import ClassNames from "classnames";
import IStore from "../../interface/IStore";

const styles = require("./styles/index.less");

interface ReposListPaginationProps {
    store?: IStore;
}

interface ReposListPaginationState {}

@inject("store")
@observer
export default class ReposListPagination extends React.Component<
    ReposListPaginationProps,
    ReposListPaginationState
> {
    constructor(props) {
        super(props);
    }

    render() {
        const mainStore = this.props.store!.main;
        const { page, pageSize, total } = mainStore;

        if (total === 0) {
            return null;
        }

        return (
            <div className={ClassNames("repoListPagination", styles.repoListPagination)}>
                <Pagination
                    simple
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={mainStore.onPageChange}
                />
            </div>
        );
    }
}
