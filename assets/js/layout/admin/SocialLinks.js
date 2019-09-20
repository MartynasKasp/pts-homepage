import React, { Component } from 'react';
import SocialLinkItem from './SocialLinkItem';

class SocialLinks extends Component {
    render() {
        return (
            <div className="row mt-4 d-flex justify-content-center">
                <div className="col-12 col-md-10">
                    {
                        this.props.socialLinks.map(socialLink => (
                            <SocialLinkItem
                                key={socialLink.id}
                                item={socialLink}
                                deleteSocial={this.props.deleteSocial}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default SocialLinks;