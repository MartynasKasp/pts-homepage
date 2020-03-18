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
            socials: [],
            addNewErrors: {
                nameError: false,
                urlError: false,
                iconError: false
            }
        }
    }

    componentDidMount() {
        axios.get(`/api/socials`)
            .then(res => this.setState({ socials: res.data }));
    }

    deleteSocialItem = (id) => {

        axios.delete(`/api/socials/${id}/delete`)
            .then(res => {
                this.setState({ socials:
                    [...this.state.socials.filter(social => social.id !== id)]
                });
            })
    };

    addSocialItem = (social) => {

        axios.post('/api/socials/add', {
            name: social.name,
            url: social.url,
            icon: social.icon
        })
            .then(response => {
                if(response.data.message) {
                    this.setState({ socials:
                            [...this.state.socials, {
                                id: response.data.item.id,
                                name: response.data.item.name,
                                url: response.data.item.url,
                                icon: response.data.item.icon,
                            }], addNewErrors: {
                            nameError: false,
                            urlError: false,
                            iconError: false,
                        }
                    })
                } else {
                    this.setState({ addNewErrors: {
                            nameError: response.data.nameError,
                            urlError: response.data.urlError,
                            iconError: response.data.iconError,
                        }
                    })
                }
            })
    };

    render() {
        return (
            <div className="container">
                <AddSocialLink
                    addSocialItem={this.addSocialItem}
                    validationErrors={this.state.addNewErrors}
                />
                <SocialLinks
                    socialLinks={this.state.socials}
                    deleteSocial={this.deleteSocialItem}
                />
            </div>
        );
    }
}

ReactDom.render(<AdminApp />, document.getElementById('root'));