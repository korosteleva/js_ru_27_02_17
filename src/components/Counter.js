import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {increment} from '../AC/index'
import {Redirect} from 'react-router-dom'

class Counter extends Component {
    static propTypes = {
        count: PropTypes.number
    };

    static contextTypes = {
        dictionary: PropTypes.object
    };

    render() {
        const {count} = this.props;
        const { dictionary } = this.context;

        if (count > 5) return <Redirect to="/filters"/>
        return (
            <div>
                <h3>{dictionary['count']}: {count}</h3>
                <a href="#" onClick={this.handleIncrement}>{dictionary['increment']}</a>
            </div>
        )
    }

    handleIncrement = (ev) => {
        ev.preventDefault()
        this.props.dispatchIncrement()
    }
}

export default connect(state => ({
    count: state.count
}), {
    dispatchIncrement: increment
})(Counter)