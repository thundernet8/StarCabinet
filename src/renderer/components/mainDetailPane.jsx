import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'
import RepoDetailToolbar            from '../containers/repoDetailToolbar'
import RepoDetail                   from '../containers/repoDetail'

// right part of the main window - for displaying selected repo detail
export default class MainDetailPane extends React.Component {

    render () {
        return (
            <div className={classNames('right', styles.right)}>
                <header className={classNames('detailHeader', styles.detailHeader)}>
                    <RepoDetailToolbar/>
                </header>
                <section
                    className={classNames('detailContent', styles.detailContent)} id="detailContent"
                    style={{backgroundImage: `url(${require('../assets/images/github-gray.png')})`}}>
                    <RepoDetail/>
                </section>
            </div>
        )
    }
}
