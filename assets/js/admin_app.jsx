import React, { Component } from 'react';
import ReactDom from 'react-dom';
import AddSocialLink from './layout/admin/AddSocialLink';
import SocialLinks from './layout/admin/SocialLinks';
import axios from 'axios';
import { Provider } from 'react-redux';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

import store from './store';

class AdminApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addNewErrors: {
                nameError: false,
                urlError: false,
                iconError: false
            }
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

    /* addSocialItem = (social) => {

        axios.post('http://127.0.0.1/api/socials/add', {
            name: social.nameValue,
            url: social.urlValue,
            icon: social.iconValue
        })
            .then(response => {
                if(response.data.message) {
                    this.setState({ socialLinks:
                            [...this.state.socialLinks, {
                                id: response.data.item.id,
                                name: response.data.item.name,
                                url: response.data.item.url,
                                icon: response.data.item.icon,
                            }]
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
    }; */

    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <AddSocialLink
                        validationErrors={this.state.addNewErrors}
                    />
                    <SocialLinks
                        deleteSocial={this.deleteSocialItem}
                    />
                </div>
            </Provider>
        );
    }
}

ReactDom.render(<AdminApp />, document.getElementById('root'));