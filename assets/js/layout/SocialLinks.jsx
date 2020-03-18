import React, { Component } from 'react';
import SocialItemDisplay from './SocialItemDisplay';
import axios from 'axios';

class SocialLinks extends Component {
    constructor() {
        super();

        this.state = { socials: [] };
    }

    componentDidMount() {
        axios.get(`/api/socials`)
            .then(res => this.setState({ socials: res.data }));
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <ul className="social">
                        {
                            this.state.socials.map(social => (
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