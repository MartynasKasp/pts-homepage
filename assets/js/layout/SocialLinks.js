import React, { Component } from 'react';
import SocialItemDisplay from './SocialItemDisplay';

class SocialLinks extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <ul className="social">
                        {
                            this.props.socialLinks.map(social => (
                                <SocialItemDisplay
                                    key={social.id}
                                    item={social}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default SocialLinks;