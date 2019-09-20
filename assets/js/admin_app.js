import React, { Component } from 'react';
import ReactDom from 'react-dom';
import AddSocialLink from './layout/admin/AddSocialLink';
import SocialLinks from './layout/admin/SocialLinks';
import axios from 'axios';

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

        axios.delete(`http://127.0.0.1/api/socials/delete/${id}`)
            .then(res => {
                this.setState({ socialLinks:
                    [...this.state.socialLinks.filter(social => social.id !== id)]
                });
            })
    };

    addSocialItem = (social) => {

        axios.post('http://127.0.0.1/api/socials/add', {
            name: social.nameValue,
            url: social.urlValue,
            icon: social.iconValue
        })
            .then(response => {
                this.setState({ socialLinks:
                    [...this.state.socialLinks, {
                        id: response.data.item.id,
                        name: response.data.item.name,
                        url: response.data.item.url,
                        icon: response.data.item.icon,
                    }]
                })
            })
    };

    render() {
        return (
            <div className="container">
                <AddSocialLink
                    addSocialItem={this.addSocialItem}
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