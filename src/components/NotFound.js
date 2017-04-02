import React, { PropTypes } from 'react'

function NotFound(props, { dictionary }) {
    return (
        <div>
            <h1>{dictionary['notFound']}</h1>
        </div>
    )
}

NotFound.propTypes = {
}

NotFound.contextTypes = {
    dictionary: PropTypes.object
};

export default NotFound