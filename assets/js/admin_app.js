import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Navbar from './layout/admin/Navbar';
import AddSocialLink from './layout/admin/AddSocialLink';
import SocialLinks from './layout/admin/SocialLinks';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

class AdminApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            socialLinks: window.REP_LOG_APP_PROPS.socialLinks,
        }
    }

    deleteSocialItem = (id) => {

        this.setState({ socialLinks:
            [...this.state.socialLinks.filter(social => social.id !== id)]
        });

        $.ajax({
            url: 'http://127.0.0.1/api/socials/delete',
            type: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(response) {
                console.log(response);
            },
            error: function(xhr) {
                console.log(`An error occurred: ${xhr.status} ${xhr.statusText}`);
            }
        });
    };

    addSocialItem = (social) => {

        this.setState({
            socialLinks: [...this.state.socialLinks, {
                name: social.nameValue,
                url: social.urlValue,
                icon: social.iconValue
            }]
        });

        $.ajax({
            url: 'http://127.0.0.1/api/socials/add',
            type: 'POST',
            data: {
                name: social.nameValue,
                url: social.urlValue,
                icon: social.iconValue
            },
            dataType: 'json',
            success: function(response) {
                console.log(response)
            },
            error: function(xhr) {
                console.log(`An error occurred: ${xhr.status} ${xhr.statusText}`)
            }
        });
    };

    render() {
        return (
            <div className="container">
                <Navbar />
                <AddSocialLink
                    addSocial={this.addSocialItem}
                />
                <SocialLinks
                    socialLinks={this.state.socialLinks}
                    deleteSocial={this.deleteSocialItem}
                />
            </div>
        );
    }
}

ReactDom.render(<AdminApp />, document.getElementById('root'));