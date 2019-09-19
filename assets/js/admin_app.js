import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Navbar from './layout/admin/Navbar';
import AddSocialLink from './layout/admin/AddSocialLink';
import SocialLinks from './layout/admin/SocialLinks';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

class AdminApp extends Component {

    deleteSocialItem(id) {

        $.ajax({
            url: 'http://127.0.0.1/api/socials',
            type: 'POST',
            data: {
                method: 'delete',
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
    }

    render() {
        return (
            <div className="container">
                <Navbar />
                <AddSocialLink />
                <SocialLinks
                    socialLinks={window.REP_LOG_APP_PROPS.socialLinks}
                    deleteSocial={this.deleteSocialItem}
                />
            </div>
        );
    }
}

ReactDom.render(<AdminApp />, document.getElementById('root'));