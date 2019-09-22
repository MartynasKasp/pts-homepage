import React, { Component } from 'react';

class SocialItemDisplay extends Component {
    render() {
        return (
            <li>
                <i className={this.props.item.icon}></i>&nbsp; <a href={this.props.item.url}>{this.props.item.name}</a>
            </li>
        )
    }
}

export default SocialItemDisplay;