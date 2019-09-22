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
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="form-row">
                        <div className="col-12 col-md-3">
                            <div className="form-group">
                                <input type="text" className="form-control" style={this.getStyle(this.props.validationErrors.nameError)} value={this.state.nameValue} onChange={this.handleChange} name="name" placeholder="Pavadinimas" />
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="form-group">
                                <input type="text" className="form-control" style={this.getStyle(this.props.validationErrors.urlError)} value={this.state.urlValue} onChange={this.handleChange} name="url" placeholder="Nuorodos adresas" />
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="form-group">
                                <input type="text" className="form-control" style={this.getStyle(this.props.validationErrors.iconError)} value={this.state.iconValue} onChange={this.handleChange} name="icon" placeholder="Ikona" />
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <button className="btn btn-success" onClick={this.props.addSocialItem.bind(this, this.state)}>
                                <i className="fas fa-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSocialLink;