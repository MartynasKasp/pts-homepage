import React, { Component } from 'react';
import SocialLinkItem from './SocialLinkItem';
import { connect } from 'react-redux';
import { fetchSocials } from '../../actions/socialActions';

class SocialLinks extends Component {

    componentDidMount() {
        this.props.fetchSocials();
    }

    componentDidUpdate(nextProps) {
        if(nextProps.newSocial) {
            this.props.socials.push(nextProps.newSocial);
        }
    }

    render() {
        return (
            <div className="row mt-4 d-flex justify-content-center">
                <div className="col-12 col-md-10">
                    {
                        this.props.socials.map(socialLink => (
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

const mapStateToProps = state => ({
    socials: state.socials.items,
    newSocial: state.socials.item
});

export default connect(mapStateToProps, { fetchSocials })(SocialLinks);