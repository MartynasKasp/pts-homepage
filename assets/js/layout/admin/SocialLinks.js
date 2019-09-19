import React, { Component } from 'react';
import SocialLinkItem from './SocialLinkItem';

class SocialLinks extends Component {
    render() {
        return (
            this.props.socialLinks.map(socialLink => (
                <SocialLinkItem
                    key={socialLink.id}
                    item={socialLink}
                    deleteSocial={this.props.deleteSocial} />
            ))
        );
    }
}

export default SocialLinks;