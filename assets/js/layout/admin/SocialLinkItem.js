import React, { Component } from 'react';
import axios from 'axios';

class SocialLinkItem extends Component {

    state = {
        id: this.props.item.id,
        nameValue: this.props.item.name,
        urlValue: this.props.item.url,
        iconValue: this.props.item.icon,
        nameError: false,
        iconError: false,
        urlError: false,
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
                        <input type="text" className="form-control" style={this.getStyle(this.state.nameError)} value={this.state.nameValue} onChange={this.handleChange} name="name" />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" style={this.getStyle(this.state.urlError)} value={this.state.urlValue} onChange={this.handleChange} name="url" />
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="form-group">
                        <input type="text" className="form-control" style={this.getStyle(this.state.iconError)} value={this.state.iconValue} onChange={this.handleChange} name="icon" />
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <button className="btn btn-success" onClick={this.editSocial()}>
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