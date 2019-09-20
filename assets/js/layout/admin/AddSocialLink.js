import React, { Component } from 'react';

export class AddSocialLink extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameValue: '',
            urlValue: '',
            iconValue: ''
        };
    }

    handleChange = (e) => {
        if(e.target.name === 'name') {
            this.setState({
                nameValue: e.target.value,
            });
        }

        if(e.target.name === 'url') {
            this.setState({
                urlValue: e.target.value,
            });
        }

        if(e.target.name === 'icon') {
            this.setState({
                iconValue: e.target.value,
            });
        }
    };

    getStyle = (error) => {
        if(error) {
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
        return (
            <div>
                <input type="text" name="name" placeholder="Social link value" style={this.getStyle(this.props.validationErrors.nameError)} value={this.state.nameValue} onChange={this.handleChange} />
                <input type="text" name="url" placeholder="Social link URL" style={this.getStyle(this.props.validationErrors.urlError)} value={this.state.urlValue} onChange={this.handleChange} />
                <input type="text" name="icon" placeholder="Social link icon" style={this.getStyle(this.props.validationErrors.iconError)} value={this.state.iconValue} onChange={this.handleChange} />
                <button onClick={this.props.addSocialItem.bind(this, this.state)}>
                    <i className="fas fa-plus-circle fa-lg"></i>
                </button>
            </div>
        );
    }
}

export default AddSocialLink;