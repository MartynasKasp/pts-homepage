import React, { Component } from 'react';
import SocialLinks from './SocialLinks';

class Header extends Component {
    render() {
        return (
            <div className="row header">
                <div id="profile-picture" className="col-12 col-md-5">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHXCzBqH-qb02GHWpaEFTTa6JSOORQQyUOFNTEOR7tONK8smY"
                        className="rounded-circle" alt="Profile picture"/>
                </div>
                <div id="header-content" className="col-8 col-md-7">
                    <div className="row">
                        <div className="col-12">
                            <h1>MARTYNAS KASPARAVIČIUS</h1>
                        </div>
                    </div>
                    <SocialLinks
                        socialLinks={this.props.socialLinks}
                    />
                </div>
            </div>
        )
    }
}

export default Header;