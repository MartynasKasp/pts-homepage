import React, { Component } from 'react';
import SocialItemDisplay from './SocialItemDisplay';
import { connect } from 'react-redux';
import { fetchSocials } from '../actions/socialActions';

class SocialLinks extends Component {

    componentDidMount() {
        this.props.fetchSocials();
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <ul className="social">
                        {
                            this.props.socials.map(social => (
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

const mapStateToProps = state => ({
   socials: state.socials.items
});

export default connect(mapStateToProps, { fetchSocials })(SocialLinks);