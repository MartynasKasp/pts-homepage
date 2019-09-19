import React, { Component } from 'react';

class SocialLinkItem extends Component {

    render() {
        const {id, name, url, icon} = this.props.item;
        return(
            <div id="social-link-item">
                <input type="text" name="socialLinkName" value={name} />
                <input type="text" name="socialLinkUrl" value={url} />
                <input type="text" name="socialLinkIcon" value={icon} />

                    <i className="fas fa-edit fa-lg"></i>

                <button onClick={this.props.deleteSocial.bind(this, id)}>
                    <i className="fas fa-trash fa-lg"></i>
                </button>
            </div>
        )
    }
}

export default SocialLinkItem;