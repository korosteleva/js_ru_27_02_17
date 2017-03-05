import React, { Component } from 'react'

export default (props) => {
    const { user, text } = props.comment;

    return (
        <div>
            <h6>{user}</h6>
            <p>{text}</p>
        </div>
    );
}
