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
                console.log(response);
            })

        /*
        $.ajax({
            url: 'http://127.0.0.1/api/sendmail',
            type: 'POST',
            data: {
                email: this.state.emailValue,
                name: this.state.nameValue,
                message: this.state.messageValue
            },
            dataType: 'json',
            success: function(response) {
                this.setState({
                    emailError: response.emailError ? response.emailError : null,
                    nameError: response.nameError ? response.nameError : null,
                    messageError: response.messageError ? response.messageError : null,
                    successMessage: response.successMessage ? response.successMessage : null
                });
            }.bind(this),
            error: function(xhr) {
                console.log(`An error occurred: ${xhr.status} ${xhr.statusText}`);
            }
        })*/

    };

    render() {
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-10 col-md-8 mt-5">
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">El. pašto adresas</label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="vardas@pavyzdys.lt" />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Jūsų vardas</label>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Įveskite vardą" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Comment</label>
                            <textarea className="form-control" id="message" name="message"
                                      placeholder="Parašykite savo žinutę čia..." rows="3" maxLength="1000"></textarea>
                        </div>
                        <button type="submit" className="btn btn-light">Siųsti</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ContactForm;