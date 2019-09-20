import React, { Component } from 'react';
import axios from 'axios';

class SocialLinkItem extends Component {

    state = {
        id: this.props.item.id,
        nameValue: this.props.item.name,
        urlValue: this.props.item.url,
        iconValue: this.props.item.icon
    };

    handleChange = (e) => {
        if(e.target.name === 'name') {
            this.setState({
                nameValue: e.target.value
            });
        }
        if(e.target.name === 'url') {
            this.setState({
                urlValue: e.target.value
            });
        }
        if(e.target.name === 'icon') {
            this.setState({
                iconValue: e.target.value
            });
        }
    };

    editSocial = () => {

        axios.post(`http://127.0.0.1/api/socials/edit/${this.state.id}`, {
            name: this.state.nameValue,
            url: this.state.urlValue,
            icon: this.state.iconValue
        });
    };

    render() {
        return(
            <div id="social-link-item">
                <input type="text" name="name" value={this.state.nameValue} onChange={this.handleChange} />
                <input type="text" name="url" value={this.state.urlValue} onChange={this.handleChange} />
                <input type="text" name="icon" value={this.state.iconValue} onChange={this.handleChange} />
                <button onClick={this.editSocial.bind(this)}>
                    <i className="fas fa-edit fa-lg"></i>
                </button>
                <button onClick={this.props.deleteSocial.bind(this, this.props.item.id)}>
                    <i className="fas fa-trash fa-lg"></i>
                </button>
            </div>
        )
    }
}

export default SocialLinkItem;