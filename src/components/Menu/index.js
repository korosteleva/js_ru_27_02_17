import React, { Component, PropTypes } from 'react'
import MenuItem from './MenuItem'

class Menu extends Component {
    static propTypes = {

    };

    static contextTypes = {
        dictionary: PropTypes.object
    };

    render() {
        const { dictionary } = this.context;
        return (
            <div>
                <h3>{dictionary.menu}</h3>
                {this.props.children}
            </div>
        )
    }
}

export { MenuItem }
export default Menu