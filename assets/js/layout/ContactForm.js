import React, { Component } from 'react';
import axios from 'axios';

class ContactForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailValue: '',
            nameValue: '',
            messageValue: '',
            emailError: '',
            nameError: '',
            messageError: '',
            errorMessage: '',
            successMessage: ''
        };
    }

    handleChange = (e) => {
        e.preventDefault();

        if(e.target.name === 'email') {
            this.setState({
                emailValue: e.target.value
            });
        }

        if(e.target.name === 'name') {
            this.setState({
                nameValue: e.target.value
            });
        }

        if(e.target.name === 'message') {
            this.setState({
                messageValue: e.target.value
            });
        }
    };

    handleSubmit = (e) => {

        e.preventDefault();

        axios.post('http://127.0.0.1/api/email/send', {
            email: this.state.emailValue,
            name: this.state.nameValue,
            message: this.state.messageValue
        })
            .then(response => {
                this.setState({
                    emailError: response.data.emailError ? response.data.emailError : '',
                    nameError: response.data.nameError ? response.data.nameError : '',
                    messageError: response.data.messageError ? response.data.messageError : '',
                    successMessage: response.data.successMessage ? response.data.successMessage : '',
                    errorMessage: response.data.errorMessage ? response.data.errorMessage : '',
                })
            })
    };

    getStyle = (error) => {
        return {
            border: error ? '1px solid #c5191c' : '1px solid #ccc'
        }
    }

    render() {
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-10 col-md-8 mt-5">

                    { this.state.successMessage &&
                        <div className="alert alert-success alert-dismissible">
                            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            {this.state.successMessage}
                        </div>
                    }

                    { this.state.errorMessage &&
                    <div className="alert alert-danger alert-dismissible">
                        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        {this.state.errorMessage}
                    </div>
                    }

                    <form onSubmit={this.handleSubmit}>

                        <div className="form-row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">El. pašto adresas</label>
                                    <input type="email" className="form-control" style={this.getStyle(this.state.emailError)} onChange={this.handleChange} name="email" id="email" placeholder="vardas@pavyzdys.lt" aria-describedby="email-error" />
                                    <small id="email-error" className="form-text validation-error">{this.state.emailError}</small>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Jūsų vardas</label>
                                    <input type="text" className="form-control" style={this.getStyle(this.state.nameError)} onChange={this.handleChange} name="name" id="name" placeholder="Įveskite vardą" aria-describedby="name-error" />
                                    <small id="name-error" className="form-text validation-error">{this.state.nameError}</small>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Comment</label>
                            <textarea className="form-control" style={this.getStyle(this.state.messageError)} id="message" name="message" onChange={this.handleChange}
                                      placeholder="Parašykite savo žinutę čia..." aria-describedby="message-error" rows="3" maxLength="1000"></textarea>
                            <small id="message-error" className="form-text validation-error">{this.state.messageError}</small>
                        </div>
                        <button type="submit" className="btn btn-light">Siųsti</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ContactForm;