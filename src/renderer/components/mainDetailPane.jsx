import React, { PropTypes }         from 'react'
import classNames                   from 'classnames'
import styles                       from '../styles/main.scss'

// right part of the main window
export default class MainDetailPane extends React.Component {
    componentDidMount () {}

    componentWillUnmount () {}

    render () {
        return (
            <div className={classNames('right', styles.right)}>
                <header className="detailHeader"/>
                <section className={classNames('detailContent', styles.detailContent)} id="detailContent" style={{backgroundImage: `url(${require('../assets/images/github-gray.png')})`}}>
                    <p>Detail</p>
                    {this.props.children}
                </section>
            </div>
        )
    }
}
