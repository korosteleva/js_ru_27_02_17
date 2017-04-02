import React, { PropTypes } from 'react'

function Loader(props, { dictionary }) {
    return (
        <h2>{dictionary['loading']}</h2>
    )
}

Loader.propTypes = {
}
Loader.contextTypes = {
    dictionary: PropTypes.object
}

export default Loader