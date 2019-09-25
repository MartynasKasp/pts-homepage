import React, { Component } from 'react';
import axios from 'axios';

class SocialLinkItem extends Component {

    state = {
        id: this.props.item.id,
        name: this.props.item.name,
        url: this.props.item.url,
        icon: this.props.item.icon,
        nameError: false,
        iconError: false,
        urlError: false,
    };

    handleChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    };

    editSocial = () => {

        axios.post(`http://127.0.0.1/api/socials/edit/${this.state.id}`, {
            name: this.state.name,
            url: this.state.url,
            icon: this.state.icon
        })
            .then(response => {
                this.setState({
                    nameError: response.data.nameError,
                    urlError: response.data.urlError,
                    iconError: response.data.iconError
                })
            });
    };

    getStyle = (error) => {
        if (error) {
            return {
                border: '1px solid #c5191c'
            }
        } else {
            return {
                border: '1px solid #bbb'
            }
        }
    };

    render() {
        return(
            <div className="form-row">
                <div className="col-12 col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" style={this.getStyle(this.state.nameError)} value={this.state.name} onChange={this.handleChange} name="name" />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" style={this.getStyle(this.state.urlError)} value={this.state.url} onChange={this.handleChange} name="url" />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" style={this.getStyle(this.state.iconError)} value={this.state.icon} onChange={this.handleChange} name="icon" />
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <button className="btn btn-success" onClick={this.editSocial}>
                        <i className="fas fa-edit"></i>
                    </button>
                    {' '}
                    <button className="btn btn-danger" onClick={this.props.deleteSocial.bind(this, this.props.item.id)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default SocialLinkItem;